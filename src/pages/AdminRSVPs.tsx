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
}

const client = generateClient();
const columnHelper = createColumnHelper<RSVP>();

export default function AdminRSVPs() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [attendingFilter, setAttendingFilter] = useState('');
  const [guestFilter, setGuestFilter] = useState('');
  const [foodFilter, setFoodFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRSVPs = async () => {
      const result = await client.graphql({ query: listRSVPS });
      if (result.data?.listRSVPS?.items) {
        setRsvps(result.data.listRSVPS.items as RSVP[]);
      } else {
        console.error('No data returned from listRSVPS query');
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
      return matchesGlobal && matchesAttending && matchesGuest && matchesFood;
    });
  }, [rsvps, globalFilter, attendingFilter, guestFilter, foodFilter]);

  const clearFilters = () => {
    setGlobalFilter('');
    setAttendingFilter('');
    setGuestFilter('');
    setFoodFilter('');
  };

  const guestCount = filteredData.filter(r => r.bringingGuest === 'yes').length;
  const attendeeCount = filteredData.filter(r => r.attending === 'yes').length;

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Attending', 'Bringing Guest', 'Guest Name', 'Food Restrictions', 'Note'];
    const rows = filteredData.map(r => [
      `${r.firstName} ${r.lastName}`,
      r.email,
      r.attending,
      r.bringingGuest,
      `${r.guestFirstName || ''} ${r.guestLastName || ''}`.trim(),
      r.foodRestrictions,
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
        />
      ),
      cell: info => (
        <input
          type="checkbox"
          checked={selectedRowIds.has(info.row.original.id)}
          onChange={() => toggleRowSelection(info.row.original.id)}
        />
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: info => (
        <button onClick={() => handleDelete(info.row.original.id)} className="text-red-500 hover:text-red-400">
          <Trash2 size={16} />
        </button>
      ),
    },
    columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
      id: 'name',
      header: 'Name',
      cell: info => info.getValue(),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => info.getValue(),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('attending', {
      header: 'Attending',
      cell: info => (
        <select
          defaultValue={info.getValue() as string}
          onBlur={e => handleUpdate(info.row.original.id, { attending: e.target.value })}
          className={clsx('px-2 py-1 rounded', {
            'bg-green-500/20 text-green-400': info.getValue() === 'yes',
            'bg-red-500/20 text-red-400': info.getValue() === 'no',
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
          className={clsx('px-2 py-1 rounded', {
            'bg-blue-500/20 text-blue-400': info.getValue() === 'yes',
            'bg-gray-500/20 text-gray-300': info.getValue() === 'no',
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
      cell: info => info.getValue(),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('foodRestrictions', {
      header: 'Food',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('adminNote', {
      header: 'Note',
      cell: info => (
        <Input
          className="bg-zinc-800 text-white"
          defaultValue={info.getValue() as string}
          onBlur={e => handleUpdate(info.row.original.id, { adminNote: e.target.value })}
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
    <div className="min-h-screen w-full bg-zinc-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">RSVP Dashboard</h2>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/')} className="gap-2 bg-zinc-700 hover:bg-zinc-600 text-white">
              <Home size={16} /> Home
            </Button>
            <Button onClick={exportCSV} className="gap-2 bg-zinc-700 hover:bg-zinc-600 text-white">
              <Download size={16} /> Export CSV
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-4 items-center flex-wrap">
          <Input
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search RSVPs..."
            className="max-w-sm bg-zinc-800 text-white"
          />
          <select value={attendingFilter} onChange={e => setAttendingFilter(e.target.value)} className="bg-zinc-800 text-white px-4 py-2 rounded text-sm">
            <option value="">All Attending</option>
            <option value="yes">Attending</option>
            <option value="no">Not Attending</option>
          </select>
          <select value={guestFilter} onChange={e => setGuestFilter(e.target.value)} className="bg-zinc-800 text-white px-4 py-2 rounded text-sm">
            <option value="">All Guests</option>
            <option value="yes">Bringing Guest</option>
            <option value="no">No Guest</option>
          </select>
          <Input
            value={foodFilter}
            onChange={e => setFoodFilter(e.target.value)}
            placeholder="Filter by food restriction..."
            className="max-w-xs bg-zinc-800 text-white"
          />
          <Button onClick={clearFilters} className="bg-zinc-700 hover:bg-zinc-600 text-white text-sm">
            Clear Filters
          </Button>
          <Button
            onClick={copyEmailsToClipboard}
            disabled={selectedRowIds.size === 0}
            className="bg-green-600 hover:bg-green-500 text-white text-sm"
          >
            Copy Emails ({selectedRowIds.size})
          </Button>
          <span className="ml-auto text-sm font-medium">
            Showing {filteredData.length} RSVP{filteredData.length !== 1 ? 's' : ''} | {attendeeCount} Attending, {guestCount} +1s
          </span>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="hover:bg-zinc-800">
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer text-white"
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
              <TableRow key={row.id} className="hover:bg-zinc-800">
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="text-white">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-6">
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="bg-zinc-700 hover:bg-zinc-600 text-white">
            <ChevronLeft className="mr-2 h-4 w-4" /> Prev
          </Button>

          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>

          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="bg-zinc-700 hover:bg-zinc-600 text-white">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
