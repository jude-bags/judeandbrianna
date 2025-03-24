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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Download, ChevronLeft, ChevronRight, Trash2, Home, Plus, 
  Check, X, User, UserPlus, Filter, User2, UsersRound, ClipboardCheck, Search 
} from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

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
  createdAt?: string;
  updatedAt?: string;
}

// Sample data for development in case backend is not connected
const SAMPLE_RSVPS: RSVP[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    attending: 'yes',
    bringingGuest: 'yes',
    guestFirstName: 'Jane',
    guestLastName: 'Smith',
    foodRestrictions: 'Vegetarian',
    adminNote: 'Close family',
    group: 'Family'
  },
  {
    id: '2',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.j@example.com',
    attending: 'yes',
    bringingGuest: 'no',
    foodRestrictions: 'No nuts',
    group: 'Friends'
  },
  {
    id: '3',
    firstName: 'Robert',
    lastName: 'Williams',
    email: 'rob.w@example.com',
    attending: 'no',
    bringingGuest: 'no',
    foodRestrictions: '',
    adminNote: 'Send thank you note'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    attending: 'yes',
    bringingGuest: 'yes',
    guestFirstName: 'Michael',
    guestLastName: 'Davis',
    foodRestrictions: 'Gluten-free',
    group: 'Friends'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.w@example.com',
    attending: 'yes',
    bringingGuest: 'no',
    foodRestrictions: '',
    group: 'Colleagues'
  }
];

const client = generateClient();
const columnHelper = createColumnHelper<RSVP>();

export default function RSVPDashboard() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [attendingFilter, setAttendingFilter] = useState('');
  const [guestFilter, setGuestFilter] = useState('');
  const [foodFilter, setFoodFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [customGroups, setCustomGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const navigate = useNavigate();

  const analytics = useMemo(() => {
    const attending = rsvps.filter(r => r.attending === 'yes').length;
    const notAttending = rsvps.filter(r => r.attending === 'no').length;
    const withGuests = rsvps.filter(r => r.bringingGuest === 'yes').length;
    const totalGuests = attending + withGuests;
    const dietaryRestrictions = rsvps.filter(r => 
      r.attending === 'yes' && r.foodRestrictions && r.foodRestrictions.trim() !== ''
    ).length;
    
    const totalResponses = rsvps.length;
    const attendingPercentage = totalResponses > 0 ? Math.round((attending / totalResponses) * 100) : 0;
    const declinedPercentage = totalResponses > 0 ? Math.round((notAttending / totalResponses) * 100) : 0;
    
    return {
      totalResponses,
      attending,
      notAttending,
      withGuests,
      totalGuests,
      dietaryRestrictions,
      attendingPercentage,
      declinedPercentage
    };
  }, [rsvps]);

  useEffect(() => {
    setSelectedCount(selectedRowIds.size);
  }, [selectedRowIds]);

  useEffect(() => {
    const fetchRSVPs = async () => {
      setLoading(true);
      try {
        const result = await client.graphql({
          query: listRSVPS
        });

        // Type checking to ensure result.data exists
        if ('data' in result && result.data?.listRSVPS?.items) {
          setRsvps(result.data.listRSVPS.items as RSVP[]);
        } else {
          console.error('No data returned from listRSVPS query');
          // Fallback to sample data for development
          setRsvps(SAMPLE_RSVPS);
          toast.error('Could not load RSVPs from backend');
        }
      } catch (error) {
        console.error('Error fetching RSVPs:', error);
        // Fallback to sample data for development
        setRsvps(SAMPLE_RSVPS);
        toast.error('Failed to load RSVPs');
      } finally {
        setLoading(false);
      }
    };
    fetchRSVPs();
  }, []);

  const handleUpdate = async (id: string, changes: Partial<RSVP>) => {
    try {
      await client.graphql({
        query: updateRSVP,
        variables: { input: { id, ...changes } },
      });
      
      setRsvps(prev =>
        prev.map(rsvp => (rsvp.id === id ? { ...rsvp, ...changes } : rsvp))
      );
      
      toast.success('RSVP updated successfully');
    } catch (error) {
      console.error('Error updating RSVP:', error);
      toast.error('Failed to update RSVP');
    }
  };

  const handleDelete = async (id: string) => {
    try {
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
      
      toast.success('RSVP deleted successfully');
    } catch (error) {
      console.error('Error deleting RSVP:', error);
      toast.error('Failed to delete RSVP');
    }
  };

  const confirmDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this RSVP?")) {
      handleDelete(id);
    }
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
      return matchesGlobal && matchesAttending && matchesGuest && matchesFood && matchesGroup;
    });
  }, [rsvps, globalFilter, attendingFilter, guestFilter, foodFilter, groupFilter]);

  const groupOptions = useMemo(() => {
    const builtInGroups = new Set<string>();
    rsvps.forEach(r => {
      if (r.group?.trim()) builtInGroups.add(r.group.trim());
    });
    return Array.from(new Set([...Array.from(builtInGroups), ...customGroups])).sort();
  }, [rsvps, customGroups]);

  const clearFilters = () => {
    setGlobalFilter('');
    setAttendingFilter('');
    setGuestFilter('');
    setFoodFilter('');
    setGroupFilter('');
    toast.info('Filters cleared');
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Attending', 'Bringing Guest', 'Guest Name', 'Food Restrictions', 'Note', 'Group'];
    const rows = filteredData.map(r => [
      `${r.firstName} ${r.lastName}`,
      r.email,
      r.attending,
      r.bringingGuest,
      `${r.guestFirstName || ''} ${r.guestLastName || ''}`.trim(),
      r.foodRestrictions,
      r.adminNote || '',
      r.group || '',
    ]);
    const csv = [headers, ...rows].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvps.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
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
      toast.success(`${selectedRowIds.size} email${selectedRowIds.size !== 1 ? 's' : ''} copied to clipboard`);
    }
  };

  const addGroup = () => {
    if (newGroupName.trim() && !customGroups.includes(newGroupName.trim())) {
      setCustomGroups(prev => [...prev, newGroupName.trim()]);
      setNewGroupName('');
      setGroupModalOpen(false);
      toast.success(`Group "${newGroupName.trim()}" added`);
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
          className="rounded border-zinc-500 text-blue-500 bg-zinc-800"
        />
      ),
      cell: info => (
        <input
          type="checkbox"
          checked={selectedRowIds.has(info.row.original.id)}
          onChange={() => toggleRowSelection(info.row.original.id)}
          className="rounded border-zinc-500 text-blue-500 bg-zinc-800"
        />
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: info => (
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={() => confirmDelete(info.row.original.id)} 
              className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-red-500/10"
            >
              <Trash2 size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Delete RSVP</p>
          </TooltipContent>
        </Tooltip>
      ),
    },
    columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
      id: 'name',
      header: () => (
        <div className="flex items-center gap-1">
          <User2 size={14} />
          <span>Name</span>
        </div>
      ),
      cell: info => (
        <div className="font-medium">{info.getValue()}</div>
      ),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => (
        <div className="text-zinc-300">{info.getValue()}</div>
      ),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('attending', {
      header: () => (
        <div className="flex items-center gap-1">
          <Check size={14} />
          <span>Attending</span>
        </div>
      ),
      cell: info => (
        <select
          defaultValue={info.getValue() as string}
          onChange={e => handleUpdate(info.row.original.id, { attending: e.target.value })}
          className={clsx('elegant-select text-sm font-medium', {
            'bg-green-500/10 text-green-300 border-green-700/30': info.getValue() === 'yes',
            'bg-red-500/10 text-red-300 border-red-700/30': info.getValue() === 'no',
          })}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      ),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('bringingGuest', {
      header: () => (
        <div className="flex items-center gap-1">
          <UserPlus size={14} />
          <span>+1</span>
        </div>
      ),
      cell: info => (
        <select
          defaultValue={info.getValue() as string}
          onChange={e => handleUpdate(info.row.original.id, { bringingGuest: e.target.value })}
          className={clsx('elegant-select text-sm font-medium', {
            'bg-blue-500/10 text-blue-300 border-blue-700/30': info.getValue() === 'yes',
            'bg-zinc-500/10 text-zinc-300 border-zinc-700/30': info.getValue() === 'no',
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
        <div className="text-zinc-300">
          {info.getValue() || <span className="text-zinc-500 italic">No guest</span>}
        </div>
      ),
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('foodRestrictions', {
      header: 'Dietary Needs',
      cell: info => {
        const restrictions = info.getValue();
        return restrictions ? (
          <div className="text-zinc-300 max-w-[200px] truncate" title={restrictions}>
            {restrictions}
          </div>
        ) : (
          <span className="text-zinc-500 italic">None</span>
        );
      },
    }),
    columnHelper.accessor('adminNote', {
      header: 'Notes',
      cell: info => (
        <Input
          className="bg-zinc-800/50 border-zinc-700 text-white text-sm focus:border-blue-500 transition-colors"
          defaultValue={info.getValue() as string}
          onBlur={e => handleUpdate(info.row.original.id, { adminNote: e.target.value })}
          placeholder="Add note..."
        />
      ),
    }),
    columnHelper.accessor('group', {
      header: () => (
        <div className="flex items-center gap-1">
          <UsersRound size={14} />
          <span>Group</span>
        </div>
      ),
      cell: info => {
        const currentGroup = info.getValue() || '';
        const rsvpId = info.row.original.id;

        return (
          <select
            value={currentGroup}
            onChange={e => handleUpdate(rsvpId, { group: e.target.value })}
            className="elegant-select text-sm bg-zinc-800/50 border-zinc-700 text-white w-full"
          >
            <option value="">— Unassigned —</option>
            {groupOptions.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        );
      },
    }),
  ], [handleUpdate, selectedRowIds, filteredData, groupOptions]);

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
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="slide-in">
            <h2 className="text-3xl font-light tracking-tight">RSVP Dashboard</h2>
            <p className="text-zinc-400 mt-1">Manage and track your wedding responses</p>
          </div>
          <div className="flex gap-3 scale-in">
            <Button onClick={() => navigate('/')} variant="outline" className="gap-2 bg-zinc-800/50 hover:bg-zinc-700 text-white border-zinc-700">
              <Home size={16} /> Home
            </Button>
            <Button onClick={exportCSV} className="gap-2 bg-zinc-800/50 hover:bg-zinc-700 text-white border-zinc-700">
              <Download size={16} /> Export CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-glass border border-white/10 backdrop-blur-md shadow-glass overflow-hidden">
            <div className="p-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-zinc-400 text-sm">Total Responses</h3>
                <UsersRound size={18} className="text-blue-400" />
              </div>
              <div className="mt-2 text-2xl font-semibold">{analytics.totalResponses}</div>
            </div>
          </Card>
          
          <Card className="bg-gradient-glass border border-white/10 backdrop-blur-md shadow-glass overflow-hidden">
            <div className="p-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-zinc-400 text-sm">Attending</h3>
                <Check size={18} className="text-green-400" />
              </div>
              <div className="mt-2 text-2xl font-semibold">{analytics.attending}</div>
              <div className="mt-1 text-xs text-zinc-400">
                {analytics.attendingPercentage}% of responses
              </div>
            </div>
          </Card>
          
          <Card className="bg-gradient-glass border border-white/10 backdrop-blur-md shadow-glass overflow-hidden">
            <div className="p-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-zinc-400 text-sm">Total Guests</h3>
                <User size={18} className="text-purple-400" />
              </div>
              <div className="mt-2 text-2xl font-semibold">{analytics.totalGuests}</div>
              <div className="mt-1 text-xs text-zinc-400">
                Including {analytics.withGuests} +1s
              </div>
            </div>
          </Card>
          
          <Card className="bg-gradient-glass border border-white/10 backdrop-blur-md shadow-glass overflow-hidden">
            <div className="p-4 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-zinc-400 text-sm">Dietary Restrictions</h3>
                <ClipboardCheck size={18} className="text-yellow-400" />
              </div>
              <div className="mt-2 text-2xl font-semibold">{analytics.dietaryRestrictions}</div>
              <div className="mt-1 text-xs text-zinc-400">
                {analytics.attending > 0 
                  ? `${Math.round((analytics.dietaryRestrictions / analytics.attending) * 100)}% of attendees` 
                  : "0% of attendees"}
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-md mb-6 p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow max-w-sm">
              <Input
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search RSVPs..."
                className="bg-zinc-800/80 border-zinc-700 text-white pl-9 focus:border-blue-500 transition-colors"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            </div>
            
            <select 
              value={attendingFilter} 
              onChange={e => setAttendingFilter(e.target.value)} 
              className="elegant-select bg-zinc-800/80 text-white border-zinc-700"
            >
              <option value="">All Attending</option>
              <option value="yes">Attending</option>
              <option value="no">Not Attending</option>
            </select>
            
            <select 
              value={guestFilter} 
              onChange={e => setGuestFilter(e.target.value)} 
              className="elegant-select bg-zinc-800/80 text-white border-zinc-700"
            >
              <option value="">All Guests</option>
              <option value="yes">Bringing Guest</option>
              <option value="no">No Guest</option>
            </select>
            
            <select 
              value={groupFilter} 
              onChange={e => setGroupFilter(e.target.value)} 
              className="elegant-select bg-zinc-800/80 text-white border-zinc-700"
            >
              <option value="">All Groups</option>
              {groupOptions.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
            
            <div className="flex gap-2 ml-auto">
              <Button onClick={clearFilters} variant="outline" size="sm" className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700 text-white text-sm">
                <Filter size={14} className="mr-1" /> Clear
              </Button>
              
              <Button
                onClick={copyEmailsToClipboard}
                disabled={selectedRowIds.size === 0}
                className="bg-blue-600/80 hover:bg-blue-500 text-white text-sm"
                size="sm"
              >
                Copy Emails {selectedCount > 0 ? `(${selectedCount})` : ''}
              </Button>
              
              <Button
                onClick={() => setGroupModalOpen(true)}
                className="bg-zinc-800/50 hover:bg-zinc-700 text-white border-zinc-700 text-sm"
                size="sm"
                variant="outline"
              >
                <Plus size={14} className="mr-1" /> Add Group
              </Button>
            </div>
          </div>
        </Card>

        <div className="rounded-md border border-zinc-800 overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="hover:bg-zinc-800/50 border-zinc-800">
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Loading RSVPs...
                  </TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No RSVPs found
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} className="hover:bg-zinc-800/50 border-zinc-800">
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
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

      <Dialog open={groupModalOpen} onOpenChange={setGroupModalOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
          <DialogHeader>
            <DialogTitle>Add New Group</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
              placeholder="Enter group name..."
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => setGroupModalOpen(false)}
              variant="outline"
              className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
            >
              Cancel
            </Button>
            <Button onClick={addGroup} className="bg-blue-600 hover:bg-blue-500 text-white">
              Add Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
