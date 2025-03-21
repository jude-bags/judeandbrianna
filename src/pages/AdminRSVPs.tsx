import { useEffect, useState, useMemo } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listRSVPS } from '@/graphql/queries';
import { updateRSVP } from '@/graphql/mutations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Download } from 'lucide-react';

const client = generateClient();

export default function AdminRSVPs() {
  const [rsvps, setRsvps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.graphql({ query: listRSVPS });
      setRsvps(result.data.listRSVPS.items);
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return rsvps.filter(rsvp => {
      const matchSearch = `${rsvp.firstName} ${rsvp.lastName} ${rsvp.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchFilter =
        filter === 'all' ||
        (filter === 'attending' && rsvp.attending === 'yes') ||
        (filter === 'not_attending' && rsvp.attending === 'no');
      return matchSearch && matchFilter;
    });
  }, [rsvps, searchTerm, filter]);

  const handleNoteChange = async (id, note) => {
    const updated = await client.graphql({
      query: updateRSVP,
      variables: { input: { id, adminNote: note } },
    });
    setRsvps(prev =>
      prev.map(rsvp => (rsvp.id === id ? { ...rsvp, adminNote: note } : rsvp))
    );
  };

  const exportToCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Attending', 'Guest', 'Guest Name', 'Food Restrictions', 'Note'];
    const rows = filtered.map(r => [
      r.firstName,
      r.lastName,
      r.email,
      r.attending,
      r.bringingGuest,
      `${r.guestFirstName || ''} ${r.guestLastName || ''}`.trim(),
      r.foodRestrictions,
      r.adminNote || ''
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rsvps.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = useMemo(() => {
    const attending = rsvps.filter(r => r.attending === 'yes');
    const guests = attending.reduce((acc, r) => acc + (r.bringingGuest === 'yes' ? 1 : 0), 0);
    const foodMap = {};
    attending.forEach(r => {
      const restriction = r.foodRestrictions?.trim().toLowerCase() || 'none';
      foodMap[restriction] = (foodMap[restriction] || 0) + 1;
    });
    return {
      total: rsvps.length,
      attending: attending.length,
      guests,
      foodMap
    };
  }, [rsvps]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">RSVP Dashboard</h2>
        <Button onClick={exportToCSV} className="flex items-center gap-2">
          <Download size={16} /> Export CSV
        </Button>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search name or email..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="attending">Attending</option>
          <option value="not_attending">Not Attending</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm text-gray-500">Total RSVPs</p>
          <p className="text-xl font-semibold">{stats.total}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <p className="text-sm text-gray-500">Attending</p>
          <p className="text-xl font-semibold">{stats.attending}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <p className="text-sm text-gray-500">+1 Guests</p>
          <p className="text-xl font-semibold">{stats.guests}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-sm text-gray-500">Food Restrictions</p>
          <p className="text-sm">
            {Object.entries(stats.foodMap).map(([key, val]) => (
              <div key={key}>{key}: {val as number}</div>
            ))}
          </p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Attending</TableHead>
            <TableHead>Guest</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map(rsvp => (
            <TableRow key={rsvp.id}>
              <TableCell>{rsvp.firstName} {rsvp.lastName}</TableCell>
              <TableCell>{rsvp.email}</TableCell>
              <TableCell>{rsvp.attending}</TableCell>
              <TableCell>{rsvp.bringingGuest === 'yes' ? `${rsvp.guestFirstName || ''} ${rsvp.guestLastName || ''}` : '—'}</TableCell>
              <TableCell>{rsvp.foodRestrictions}</TableCell>
              <TableCell>
                <Input
                  defaultValue={rsvp.adminNote || ''}
                  onBlur={e => handleNoteChange(rsvp.id, e.target.value)}
                  className="text-sm"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
