import { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { listRSVPS } from "@/graphql/queries";

const client = generateClient();

export default function AdminRSVPs() {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const response: any = await client.graphql({ query: listRSVPS });
        const items = response.data.listRSVPS.items;
        setRsvps(items);
      } catch (err) {
        console.error("Error loading RSVPs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">RSVP Submissions</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-left text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Attending</th>
                <th className="p-2">Guest</th>
                <th className="p-2">Food Restrictions</th>
                <th className="p-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => (
                <tr key={rsvp.id} className="border-t">
                  <td className="p-2">{rsvp.firstName} {rsvp.lastName}</td>
                  <td className="p-2">{rsvp.email}</td>
                  <td className="p-2">{rsvp.attending}</td>
                  <td className="p-2">
                    {rsvp.bringingGuest === "yes" ? `${rsvp.guestFirstName} ${rsvp.guestLastName}` : "—"}
                  </td>
                  <td className="p-2">{rsvp.foodRestrictions || "—"}</td>
                  <td className="p-2">{new Date(rsvp.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
