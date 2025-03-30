
import { useState } from 'react';
import { createRSVP } from '@/graphql/mutations';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    attending: '',
    bringingGuest: '',
    guestFirstName: '',
    guestLastName: '',
    foodRestrictions: '',
    needsHotelRoom: '',
    numberOfRooms: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await client.graphql({
        query: createRSVP,
        variables: { input: formData },
        authMode: 'apiKey'  // 👈 Fix: allow unauthenticated (public) access
      });
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit RSVP. Please try again.');
      console.error('RSVP error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <p className="text-green-500 font-semibold text-center">Thank you! Your RSVP has been received.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-lg mx-auto text-black">
      <div className="grid gap-4">
        <input name="firstName" placeholder="First Name" required onChange={handleChange} className="border p-2 rounded" />
        <input name="lastName" placeholder="Last Name" required onChange={handleChange} className="border p-2 rounded" />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="border p-2 rounded" />
        <select name="attending" required onChange={handleChange} className="border p-2 rounded">
          <option value="">Will you attend?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <select name="bringingGuest" onChange={handleChange} className="border p-2 rounded">
          <option value="">Bringing a guest?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input name="guestFirstName" placeholder="Guest First Name" onChange={handleChange} className="border p-2 rounded" />
        <input name="guestLastName" placeholder="Guest Last Name" onChange={handleChange} className="border p-2 rounded" />
        <input name="foodRestrictions" placeholder="Food Restrictions" onChange={handleChange} className="border p-2 rounded" />
        <select name="needsHotelRoom" onChange={handleChange} className="border p-2 rounded">
          <option value="">Need a hotel room?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input name="numberOfRooms" type="number" placeholder="Number of rooms" onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {submitting ? 'Submitting...' : 'Submit RSVP'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </form>
  );
}
