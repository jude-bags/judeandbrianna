import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { createRSVP } from '@/graphql/mutations'; // adjust path if needed

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  attending: string;
  bringingGuest: string;
  guestFirstName: string;
  guestLastName: string;
  foodRestrictions: string;
};

const client = generateClient();

export default function RSVPForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    attending: '',
    bringingGuest: '',
    guestFirstName: '',
    guestLastName: '',
    foodRestrictions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string, name: string) => {
    if (name === 'attending' && value === 'no') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        bringingGuest: '',
        guestFirstName: '',
        guestLastName: '',
        foodRestrictions: '',
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

      toast({
        title: "RSVP Submitted",
        description: "Thank you for your response. We look forward to celebrating with you!",
        duration: 5000,
      });

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
      console.error("Error submitting RSVP:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        duration: 5000,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-8 md:p-12 w-full max-w-2xl mx-auto">
      {/* Name Fields */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <span className="font-serif text-2xl text-wedding-black">Name</span>
          <span className="text-sm text-wedding-gray-500 ml-2 italic">(required)</span>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col">
            <span className="text-wedding-gray-600 mb-2 text-sm">First Name</span>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="border-b border-wedding-gray-400 pb-1 bg-transparent focus:outline-none focus:border-wedding-black transition-colors"
              placeholder=""
            />
          </div>
          <div className="flex flex-col">
            <span className="text-wedding-gray-600 mb-2 text-sm">Last Name</span>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="border-b border-wedding-gray-400 pb-1 bg-transparent focus:outline-none focus:border-wedding-black transition-colors"
              placeholder=""
            />
          </div>
        </div>
      </div>

      {/* Email Field */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <span className="font-serif text-2xl text-wedding-black">Email</span>
          <span className="text-sm text-wedding-gray-500 ml-2 italic">(required)</span>
        </div>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border-b border-wedding-gray-400 pb-1 bg-transparent focus:outline-none focus:border-wedding-black transition-colors"
          placeholder=""
        />
      </div>

      {/* Attending Question */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <span className="font-serif text-2xl text-wedding-black">Will you be attending?</span>
          <span className="text-sm text-wedding-gray-500 ml-2 italic">(required)</span>
        </div>
        <div className="flex gap-8">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={formData.attending === 'yes'}
              onChange={() => handleRadioChange('yes', 'attending')}
              className="appearance-none w-5 h-5 border border-wedding-gray-400 rounded-full checked:bg-wedding-black checked:border-wedding-black relative"
              required
            />
            <span className="text-base">Yes</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="attending"
              value="no"
              checked={formData.attending === 'no'}
              onChange={() => handleRadioChange('no', 'attending')}
              className="appearance-none w-5 h-5 border border-wedding-gray-400 rounded-full checked:bg-wedding-black checked:border-wedding-black relative"
            />
            <span className="text-base">No</span>
          </label>
        </div>
      </div>

      {/* Decline Message */}
      {formData.attending === 'no' && (
        <div className="mb-12 p-6 border border-wedding-gray-300 bg-wedding-gray-100">
          <h3 className="font-serif text-xl text-wedding-black mb-4">We understand and we'll miss you!</h3>
          <p className="text-wedding-gray-700 mb-6">
            We would have loved to celebrate our special day with you, but we understand that life isn't always convenient.
            If you'd still like to be a part of our journey, consider visiting our registry or contributing to our honeymoon fund.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registry" className="uppercase px-6 py-3 border border-wedding-black hover:bg-wedding-black hover:text-white transition-colors duration-300 text-sm tracking-widest font-medium text-center">
              REGISTRY
            </Link>
            <Link to="/registry" className="uppercase px-6 py-3 border border-wedding-black hover:bg-wedding-black hover:text-white transition-colors duration-300 text-sm tracking-widest font-medium text-center">
              HONEYMOON FUND
            </Link>
          </div>
        </div>
      )}

      {/* Guest Option */}
      {formData.attending === 'yes' && (
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <span className="font-serif text-2xl text-wedding-black">Will you be bringing a guest?</span>
            <span className="text-sm text-wedding-gray-500 ml-2 italic">(required)</span>
          </div>
          <div className="flex gap-8 mb-10">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="bringingGuest"
                value="yes"
                checked={formData.bringingGuest === 'yes'}
                onChange={() => handleRadioChange('yes', 'bringingGuest')}
                className="appearance-none w-5 h-5 border border-wedding-gray-400 rounded-full checked:bg-wedding-black checked:border-wedding-black relative"
                required
              />
              <span className="text-base">Yes</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="bringingGuest"
                value="no"
                checked={formData.bringingGuest === 'no'}
                onChange={() => handleRadioChange('no', 'bringingGuest')}
                className="appearance-none w-5 h-5 border border-wedding-gray-400 rounded-full checked:bg-wedding-black checked:border-wedding-black relative"
              />
              <span className="text-base">No</span>
            </label>
          </div>
        </div>
      )}

      {/* Guest Name Fields */}
      {formData.attending === 'yes' && formData.bringingGuest === 'yes' && (
        <div className="mb-12">
          <span className="font-serif text-2xl text-wedding-black mb-6 block">Guest Name</span>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col">
              <span className="text-wedding-gray-600 mb-2 text-sm">First Name</span>
              <input
                type="text"
                name="guestFirstName"
                value={formData.guestFirstName}
                onChange={handleChange}
                className="border-b border-wedding-gray-400 pb-1 bg-transparent focus:outline-none focus:border-wedding-black transition-colors"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-wedding-gray-600 mb-2 text-sm">Last Name</span>
              <input
                type="text"
                name="guestLastName"
                value={formData.guestLastName}
                onChange={handleChange}
                className="border-b border-wedding-gray-400 pb-1 bg-transparent focus:outline-none focus:border-wedding-black transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* Food Restrictions */}
      {formData.attending === 'yes' && (
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <span className="font-serif text-2xl text-wedding-black">Any food restrictions?</span>
            <span className="text-sm text-wedding-gray-500 ml-2 italic">(required)</span>
          </div>
          <input
            type="text"
            name="foodRestrictions"
            required={formData.attending === 'yes'}
            value={formData.foodRestrictions}
            onChange={handleChange}
            className="w-full border-b border-wedding-gray-400 pb-1 bg-transparent focus:outline-none focus:border-wedding-black transition-colors"
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="uppercase px-10 py-4 border border-wedding-black hover:bg-wedding-black hover:text-white transition-colors duration-300 text-sm tracking-widest font-medium"
        >
          SEND
        </button>
      </div>
    </form>
  );
}