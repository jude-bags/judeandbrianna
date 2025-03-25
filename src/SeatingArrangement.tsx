
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listRSVPS, updateRSVP } from '@/graphql/queries'; // Adjust if needed
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

type RSVP = {
  id: string;
  firstName: string;
  lastName: string;
  attending: string;
  group?: string;
  assignedTable?: number;
};

const client = generateClient();
const MAX_PER_TABLE = 8;

export default function SeatingArrangement() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [tables, setTables] = useState<Record<number, RSVP[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await client.graphql({ query: listRSVPS });
      const all = res.data?.listRSVPS?.items?.filter((r: RSVP) => r.attending === 'yes') || [];
      setRsvps(all);
      const grouped: Record<number, RSVP[]> = {};
      let tableNum = 1;
      for (let i = 0; i < all.length; i++) {
        if (!grouped[tableNum]) grouped[tableNum] = [];
        grouped[tableNum].push(all[i]);
        if (grouped[tableNum].length >= MAX_PER_TABLE) tableNum++;
      }
      setTables(grouped);
    };
    fetchData();
  }, []);

  const moveToTable = (guest: RSVP, targetTable: number) => {
    const updated: Record<number, RSVP[]> = {};
    for (const [num, list] of Object.entries(tables)) {
      updated[+num] = list.filter((g) => g.id !== guest.id);
    }
    if (!updated[targetTable]) updated[targetTable] = [];
    if (updated[targetTable].length < MAX_PER_TABLE) {
      updated[targetTable].push(guest);
    }
    setTables(updated);
  };

  const saveArrangement = async () => {
    const updates = Object.entries(tables).flatMap(([tableNum, guests]) =>
      guests.map((g) => ({
        id: g.id,
        assignedTable: +tableNum,
      }))
    );

    for (const item of updates) {
      await client.graphql({
        query: updateRSVP,
        variables: {
          input: {
            id: item.id,
            assignedTable: item.assignedTable,
          },
        },
      });
    }

    alert('Seating saved!');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-semibold text-white">Seating Arrangement</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(tables).map(([tableNum, guests]) => (
          <Card key={tableNum} className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg shadow-md">
            <h3 className="text-white mb-2 font-bold">Table {tableNum}</h3>
            <ul className="space-y-1">
              {guests.map((g) => (
                <li key={g.id} className="text-white flex justify-between items-center border-b border-zinc-700 py-1">
                  <span>{g.firstName} {g.lastName}</span>
                  <div className="flex gap-1">
                    {Object.keys(tables).map((t) =>
                      t !== tableNum ? (
                        <Button
                          key={t}
                          size="sm"
                          variant="ghost"
                          className="text-xs text-blue-400"
                          onClick={() => moveToTable(g, +t)}
                        >
                          Move to {t}
                        </Button>
                      ) : null
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Button onClick={saveArrangement} className="bg-green-600 hover:bg-green-500 text-white">
          Save Arrangement
        </Button>
      </div>
    </div>
  );
}
