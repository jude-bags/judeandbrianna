import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { createRSVP } from '@/graphql/mutations';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const client = generateClient();
const ebClient = new EventBridgeClient({ region: 'us-east-2' });

export default function RSVPForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    attending: '',
    bringingGuest: '',
    guestFirstName: '',
    guestLastName: '',
    foodRestrictions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value, name) => {
    if (name === 'attending' && value === 'no') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        bringingGuest: '',
        guestFirstName: '',
        guestLastName: '',
        foodRestrictions: '',
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await client.graphql({
        query: createRSVP,
        variables: {
          input: {
            ...formData,
            timestamp: new Date().toISOString(),
          },
        },
      });

      await ebClient.send(
        new PutEventsCommand({
          Entries: [
            {
              Source: 'wedding.site',
              DetailType: 'RSVP_SUBMITTED',
              Detail: JSON.stringify({
                firstName: formData.firstName,
                email: formData.email,
                attending: formData.attending,
              }),
              EventBusName: 'default',
            },
          ],
        })
      );

      if (formData.attending === 'yes') {
        toast({
          title: 'You’re on the list! 💌',
          description:
            'Thank you for RSVPing. We are thrilled you can join us on our big day. Head over to our registry and honeymoon fund to learn more. Also, don’t forget to check out the travel and stay options for planning your trip!',
          duration: 5000,
        });

        setTimeout(() => {
          navigate('/registry');
        }, 5000);
      } else {
        toast({
          title: 'We’ll miss you 💔',
          description:
            'Thank you for letting us know. While we’re sad you can’t attend, we’d still love for you to be part of our journey. Feel free to visit our registry or contribute to our honeymoon fund. Your love and support mean everything.',
          duration: 5000,
        });

        setTimeout(() => {
          navigate('/registry');
        }, 5000);
      }

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        attending: '',
        bringingGuest: '',
        guestFirstName: '',
        guestLastName: '',
        foodRestrictions: '',
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong while submitting your RSVP. Please try again shortly.',
        duration: 5000,
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-8 md:p-12 w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <label className="block mb-2 font-semibold">First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Will you be attending?</label>
        <div className="flex gap-4">
          <label><input type="radio" name="attending" value="yes" checked={formData.attending === 'yes'} onChange={() => handleRadioChange('yes', 'attending')} required /> Yes</label>
          <label><input type="radio" name="attending" value="no" checked={formData.attending === 'no'} onChange={() => handleRadioChange('no', 'attending')} /> No</label>
        </div>
      </div>
      {formData.attending === 'yes' && (
        <>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Will you be bringing a guest?</label>
            <div className="flex gap-4">
              <label><input type="radio" name="bringingGuest" value="yes" checked={formData.bringingGuest === 'yes'} onChange={() => handleRadioChange('yes', 'bringingGuest')} required /> Yes</label>
              <label><input type="radio" name="bringingGuest" value="no" checked={formData.bringingGuest === 'no'} onChange={() => handleRadioChange('no', 'bringingGuest')} /> No</label>
            </div>
          </div>
          {formData.bringingGuest === 'yes' && (
            <>
              <div className="mb-6">
                <label className="block mb-2 font-semibold">Guest First Name</label>
                <input type="text" name="guestFirstName" value={formData.guestFirstName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-semibold">Guest Last Name</label>
                <input type="text" name="guestLastName" value={formData.guestLastName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
            </>
          )}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Any food restrictions?</label>
            <input type="text" name="foodRestrictions" value={formData.foodRestrictions} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
        </>
      )}
      <div className="flex justify-center">
        <button type="submit" className="uppercase px-10 py-4 border border-wedding-black hover:bg-wedding-black hover:text-white transition-colors duration-300 text-sm tracking-widest font-medium">
          SEND
        </button>
      </div>
    </form>
  );
}
