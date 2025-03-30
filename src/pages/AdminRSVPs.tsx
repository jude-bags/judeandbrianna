import { useEffect, useMemo, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listRSVPS } from '@/graphql/queries';
import { updateRSVP, deleteRSVP } from '@/graphql/mutations';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, ChevronLeft, ChevronRight, Trash2, Home } from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';


interface RSVP {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  attending: string;
  bringingGuest: string;
  guestFirstName?: string;
  guestLastName?: string;
  foodRestrictions: string;
  adminNote?: string;
  group?: string;
  needsHotelRoom?: string;
  numberOfRooms?: string;
}

const client = generateClient();
const columnHelper = createColumnHelper<RSVP>();

export default function AdminRSVPs() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [attendingFilter, setAttendingFilter] = useState('');
  const [guestFilter, setGuestFilter] = useState('');
  const [foodFilter, setFoodFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [hotelFilter, setHotelFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const session = await fetchAuthSession();
        if (!session.tokens?.idToken) {
          console.warn("User is not authenticated yet.");
          return;
        }
  
        const result = await client.graphql({ query: listRSVPS });
        if ('data' in result && result.data?.listRSVPS?.items) {
          setRsvps(result.data.listRSVPS.items);
        } else {
          console.error('No data returned from listRSVPS query');
        }
      } catch (error) {
        console.error('Error fetching RSVPs:', error);
      }
    };
    fetchRSVPs();
  }, []);

  const handleUpdate = async (id: string, changes: Partial<RSVP>) => {
    await client.graphql({
      query: updateRSVP,
      variables: { input: { id, ...changes } },
    });
    setRsvps(prev =>
      prev.map(rsvp => (rsvp.id === id ? { ...rsvp, ...changes } : rsvp))
    );
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this RSVP?");
    if (!confirmed) return;

    await client.graphql({
      query: deleteRSVP,
      variables: { input: { id } },
    });
    setRsvps(prev => prev.filter(rsvp => rsvp.id !== id));
    setSelectedRowIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const filteredData = useMemo(() => {
    return rsvps.filter(rsvp => {
      const matchesGlobal = `${rsvp.firstName} ${rsvp.lastName} ${rsvp.email}`
        .toLowerCase()
        .includes(globalFilter.toLowerCase());
      const matchesAttending = attendingFilter ? rsvp.attending === attendingFilter : true;
      const matchesGuest = guestFilter ? rsvp.bringingGuest === guestFilter : true;
      const matchesFood = foodFilter ? rsvp.foodRestrictions?.toLowerCase().includes(foodFilter.toLowerCase()) : true;
      const matchesGroup = groupFilter ? rsvp.group === groupFilter : true;
      const matchesHotel = hotelFilter ? rsvp.needsHotelRoom === hotelFilter : true;
      return matchesGlobal && matchesAttending && matchesGuest && matchesFood && matchesGroup && matchesHotel;
    });
  }, [rsvps, globalFilter, attendingFilter, guestFilter, foodFilter, groupFilter]);

  const clearFilters = () => {
    setGlobalFilter('');
    setAttendingFilter('');
    setGuestFilter('');
    setFoodFilter('');
    setGroupFilter('');
  };

  const groups = useMemo(() => {
    const allGroups = new Set<string>();
    rsvps.forEach(rsvp => {
      if (rsvp.group) allGroups.add(rsvp.group);
    });
    return Array.from(allGroups);
  }, [rsvps]);

  const guestCount = filteredData.filter(r => r.bringingGuest === 'yes').length;
  const attendeeCount = filteredData.filter(r => r.attending === 'yes').length;

  const exportCSV = () => {
    const exportData = selectedRowIds.size > 0 ? filteredData.filter(r => selectedRowIds.has(r.id)) : filteredData;
    const headers = ['Name', 'Email', 'Attending', 'Bringing Guest', 'Guest Name', 'Food Restrictions', 'Needs Hotel Room', '# Rooms', 'Note'];
    const rows = exportData.map(r => [
      `${r.firstName} ${r.lastName}`,
      r.email,
      r.attending,
      r.bringingGuest,
      `${r.guestFirstName || ''} ${r.guestLastName || ''}`.trim(),
      r.foodRestrictions,
      r.needsHotelRoom || '',
      r.numberOfRooms || '',
      r.adminNote || '',
    ]);
    const csv = [headers, ...rows].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvps.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRowIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const toggleAllRows = (checked: boolean) => {
    if (checked) {
      const allIds = filteredData.map(r => r.id);
      setSelectedRowIds(new Set(allIds));
    } else {
      setSelectedRowIds(new Set());
    }
  };

  const selectedEmails = filteredData
    .filter(rsvp => selectedRowIds.has(rsvp.id))
    .map(rsvp => rsvp.email)
    .join(', ');

  const copyEmailsToClipboard = () => {
    if (selectedEmails) {
      navigator.clipboard.writeText(selectedEmails);
    }
  };

  const columns = useMemo<ColumnDef<RSVP, any>[]>(() => [
    {
      id: 'select',
      header: () => (
        <input
          type="checkbox"
          checked={selectedRowIds.size === filteredData.length && filteredData.length > 0}
          onChange={e => toggleAllRows(e.target.checked)}
          className="rounded border-purple-400 text-purple-600 bg-zinc-800/50"
        />
      ),
      cell: info => (
        <input
          type="checkbox"
          checked={selectedRowIds.has(info.row.original.id)}
          onChange={() => toggleRowSelection(info.row.original.id)}
          className="rounded border-purple-400 text-purple-600 bg-zinc-800/50"
        />
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: info => (
        <button 
          onClick={() => handleDelete(info.row.original.id)} 
          className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-red-500/10"
        >
          <Trash2 size={16} />
        </button>
      ),
    },
    columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
      id: 'name',
      header: 'Name',
      cell: info => (
        <div className="font-medium text-white">{info.getValue()}</div>
      ),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => (
        <div className="text-blue-300">{info.getValue()}</div>
      ),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('attending', {
      header: 'Attending',
      cell: info => (
        <select
          defaultValue={info.getValue() as string}
          onBlur={e => handleUpdate(info.row.original.id, { attending: e.target.value })}
          className={clsx('px-2 py-1 rounded border font-medium transition-colors', {
            'bg-green-500/20 text-green-300 border-green-700/30': info.getValue() === 'yes',
            'bg-red-500/20 text-red-300 border-red-700/30': info.getValue() === 'no',
          })}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      ),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('bringingGuest', {
      header: 'Bringing Guest',
      cell: info => (
        <select
          defaultValue={info.getValue() as string}
          onBlur={e => handleUpdate(info.row.original.id, { bringingGuest: e.target.value })}
          className={clsx('px-2 py-1 rounded border font-medium transition-colors', {
            'bg-purple-500/20 text-purple-300 border-purple-700/30': info.getValue() === 'yes',
            'bg-zinc-500/20 text-zinc-300 border-zinc-700/30': info.getValue() === 'no',
          })}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      ),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor(row => `${row.guestFirstName || ''} ${row.guestLastName || ''}`.trim(), {
      id: 'guestName',
      header: 'Guest Name',
      cell: info => (
        <div className="text-amber-300">
          {info.getValue() || <span className="text-zinc-500 italic">No guest</span>}
        </div>
      ),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('foodRestrictions', {
      header: 'Food',
      cell: info => {
        const restrictions = info.getValue();
        return restrictions ? (
          <div className="text-teal-300 max-w-[200px] truncate" title={restrictions}>
            {restrictions}
          </div>
        ) : (
          <span className="text-zinc-500 italic">None</span>
        );
      },
    }),
    
    columnHelper.accessor('group', {
      header: 'Group',
      cell: (info) => {
        const rsvp = info.row.original;
        return (
          <select
            value={rsvp.group || ''}
            onChange={(e) => handleUpdate(rsvp.id, { group: e.target.value })}
            className="bg-zinc-800/50 border-zinc-700 text-pink-300 px-2 py-1 rounded transition-colors focus:border-pink-500"
          >
            <option value="">Unassigned</option>
            <option value="Bride's Family">Bride's Family</option>
            <option value="Groom's Family">Groom's Family</option>
            <option value="Friends">Groom's Friends</option>
            <option value="Friends">Bride's Friends</option>
            <option value="Friends">Groom's Colleagues</option>
            <option value="Friends">Bride's Colleagues</option>
          </select>
        );
      },
    }),
    
  columnHelper.accessor('needsHotelRoom', {
    header: 'Hotel Room',
    cell: info => {
      const value = info.getValue() || '';
      const id = info.row.original.id;
      return (
        <select
          value={value}
          onChange={(e) => handleUpdate(id, { needsHotelRoom: e.target.value })}
          className="bg-zinc-800/50 text-white border-zinc-700 px-2 py-1 rounded"
        >
          <option value="">Unspecified</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      );
    },
  }),

  columnHelper.accessor('numberOfRooms', {
    header: '# Rooms',
    cell: info => {
      const value = info.getValue() || '';
      const id = info.row.original.id;
      return (
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => handleUpdate(id, { numberOfRooms: e.target.value })}
          className="w-16 bg-zinc-800/50 text-white border-zinc-700 px-2 py-1 rounded"
          placeholder="0"
        />
      );
    },
  }),

  columnHelper.accessor('adminNote', {
      header: 'Note',
      cell: info => (
        <Input
          className="bg-zinc-800/50 border-zinc-700 text-white focus:border-blue-500 transition-colors"
          defaultValue={info.getValue() as string}
          onBlur={e => handleUpdate(info.row.original.id, { adminNote: e.target.value })}
          placeholder="Add note..."
        />
      ),
    }),
  ], [handleUpdate, selectedRowIds, filteredData]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { globalFilter, sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: false,
    enableSorting: true,
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-900 to-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-light tracking-tight">RSVP Dashboard</h2>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/')} variant="outline" className="gap-2 bg-zinc-800/50 hover:bg-zinc-700 text-white border-zinc-700">
              <Home size={16} /> Home
            </Button>
            <Button onClick={exportCSV} className="gap-2 bg-purple-600/80 hover:bg-purple-500 text-white">
              <Download size={16} /> Export CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-800/30 rounded-lg p-4">
            <div className="text-blue-400 text-sm mb-1">Total RSVPs</div>
            <div className="text-2xl font-semibold">{filteredData.length}</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-800/30 rounded-lg p-4">
            <div className="text-green-400 text-sm mb-1">Attending</div>
            <div className="text-2xl font-semibold">{attendeeCount}</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-800/30 rounded-lg p-4">
            <div className="text-purple-400 text-sm mb-1">Plus Ones</div>
            <div className="text-2xl font-semibold">{guestCount}</div>
          </div>
          
          
          <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border border-yellow-800/30 rounded-lg p-4">
            <div className="text-yellow-400 text-sm mb-1">Needs Hotel Room</div>
            <div className="text-2xl font-semibold">{filteredData.filter(r => r.needsHotelRoom === 'yes').length}</div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 border border-orange-800/30 rounded-lg p-4">
            <div className="text-orange-400 text-sm mb-1">Total Rooms Requested</div>
            <div className="text-2xl font-semibold">{filteredData.reduce((sum, r) => sum + (parseInt(r.numberOfRooms) || 0), 0)}</div>
          </div>


          <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/20 border border-pink-800/30 rounded-lg p-4">
            <div className="text-pink-400 text-sm mb-1">Total Guests</div>
            <div className="text-2xl font-semibold">{attendeeCount + guestCount}</div>
          </div>
        </div>

        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4 mb-6">
          <div className="flex gap-4 items-center flex-wrap">
            <Input
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search RSVPs..."
              className="max-w-sm bg-zinc-800/80 border-zinc-700 text-white"
            />
            <select 
              value={hotelFilter} 
              onChange={e => setHotelFilter(e.target.value)} 
              className="bg-zinc-800/80 text-white px-4 py-2 rounded text-sm border border-zinc-700"
            >
              <option value="">All Hotel Status</option>
              <option value="yes">Needs Hotel</option>
              <option value="no">No Hotel</option>
            </select>

            <select 
              value={attendingFilter} 
              onChange={e => setAttendingFilter(e.target.value)} 
              className="bg-zinc-800/80 text-white px-4 py-2 rounded text-sm border border-zinc-700"
            >
              <option value="">All Attending</option>
              <option value="yes">Attending</option>
              <option value="no">Not Attending</option>
            </select>
            <select 
              value={guestFilter} 
              onChange={e => setGuestFilter(e.target.value)} 
              className="bg-zinc-800/80 text-white px-4 py-2 rounded text-sm border border-zinc-700"
            >
              <option value="">All Guests</option>
              <option value="yes">Bringing Guest</option>
              <option value="no">No Guest</option>
            </select>
            <select
              value={groupFilter}
              onChange={e => setGroupFilter(e.target.value)}
              className="bg-zinc-800/80 text-white px-4 py-2 rounded text-sm border border-zinc-700"
            >
              <option value="">All Groups</option>
              <option value="Bride's Family">Bride's Family</option>
              <option value="Groom's Family">Groom's Family</option>
              <option value="Friends">Friends</option>
              <option value="Vendors">Vendors</option>
              <option value="">Unassigned</option>
            </select>
            <Input
              value={foodFilter}
              onChange={e => setFoodFilter(e.target.value)}
              placeholder="Filter by food restriction..."
              className="max-w-xs bg-zinc-800/80 border-zinc-700 text-white"
            />
            <Button 
              onClick={clearFilters} 
              variant="outline" 
              className="bg-zinc-800/50 hover:bg-zinc-700 text-white border-zinc-700 text-sm"
            >
              Clear Filters
            </Button>
            <Button
              onClick={copyEmailsToClipboard}
              disabled={selectedRowIds.size === 0}
              className="bg-blue-600/80 hover:bg-blue-500 text-white text-sm ml-auto"
            >
              Copy Emails ({selectedRowIds.size})
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-700 overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="hover:bg-zinc-800/50 border-zinc-700">
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="text-zinc-400 font-medium cursor-pointer hover:text-white transition-colors"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? ' ↑' : ' ↓') : ''}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className="hover:bg-zinc-800/50 border-zinc-700">
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()} 
            className="bg-zinc-800/50 hover:bg-zinc-700 text-white border-zinc-700"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <span className="text-sm text-zinc-400">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>

          <Button 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()} 
            className="bg-zinc-800/50 hover:bg-zinc-700 text-white border-zinc-700"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
