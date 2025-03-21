import { useEffect, useMemo, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listRSVPS } from '@/graphql/queries';
import { updateRSVP } from '@/graphql/mutations';
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
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

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

  const columns = useMemo<ColumnDef<RSVP, any>[]>(() => [
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
            'bg-green-100 text-green-800': info.getValue() === 'yes',
            'bg-red-100 text-red-800': info.getValue() === 'no',
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
            'bg-green-100 text-green-800': info.getValue() === 'yes',
            'bg-gray-200 text-gray-800': info.getValue() === 'no',
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
          defaultValue={info.getValue() as string}
          onBlur={e => handleUpdate(info.row.original.id, { adminNote: e.target.value })}
        />
      ),
    }),
  ], []);

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
    <div className="max-w-7xl mx-auto p-6 bg-black text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">RSVP Dashboard</h2>
        <Button onClick={exportCSV} className="gap-2">
          <Download size={16} /> Export CSV
        </Button>
      </div>

      <div className="flex gap-4 mb-4 items-center flex-wrap">
        <Input
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search RSVPs..."
          className="max-w-sm"
        />
        <select value={attendingFilter} onChange={e => setAttendingFilter(e.target.value)} className="border px-4 py-2 rounded text-sm text-black">
          <option value="">All Attending</option>
          <option value="yes">Attending</option>
          <option value="no">Not Attending</option>
        </select>
        <select value={guestFilter} onChange={e => setGuestFilter(e.target.value)} className="border px-4 py-2 rounded text-sm text-black">
          <option value="">All Guests</option>
          <option value="yes">Bringing Guest</option>
          <option value="no">No Guest</option>
        </select>
        <Input
          value={foodFilter}
          onChange={e => setFoodFilter(e.target.value)}
          placeholder="Filter by food restriction..."
          className="max-w-xs"
        />
        <Button onClick={clearFilters} variant="outline" className="text-sm">
          Clear Filters
        </Button>
        <span className="ml-auto text-sm font-medium">
          Showing {filteredData.length} RSVP{filteredData.length !== 1 ? 's' : ''} | {attendeeCount} Attending, {guestCount} +1s
        </span>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer"
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
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-6">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Prev
        </Button>

        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} variant="outline">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
