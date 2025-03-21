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

  const columns = useMemo<ColumnDef<RSVP, any>[]>(() => [
    columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
      id: 'name',
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('attending', {
      header: 'Attending',
      cell: info => (
        <select
          defaultValue={info.getValue() as string}
          onBlur={e => handleUpdate(info.row.original.id, { attending: e.target.value })}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      ),
    }),
    columnHelper.accessor('bringingGuest', {
      header: 'Bringing Guest',
      cell: info => (
        <select
          defaultValue={info.getValue() as string}
          onBlur={e => handleUpdate(info.row.original.id, { bringingGuest: e.target.value })}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      ),
    }),
    columnHelper.accessor(row => `${row.guestFirstName || ''} ${row.guestLastName || ''}`.trim(), {
      id: 'guestName',
      header: 'Guest Name',
      cell: info => info.getValue(),
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
    data: rsvps,
    columns,
    state: { globalFilter, sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">RSVP Dashboard</h2>
        <Button onClick={() => table.setPageIndex(0)} className="gap-2">
          <Download size={16} /> Export CSV
        </Button>
      </div>

      <Input
        value={globalFilter ?? ''}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="Search RSVPs..."
        className="max-w-sm mb-4"
      />

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
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Prev
        </Button>

        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          variant="outline"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}