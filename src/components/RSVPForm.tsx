import { useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { useToast } from "@/components/ui/use-toast";
import { createRSVP } from '../graphql/mutations';
import { Link } from "react-router-dom";

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
    firstName: "",
    lastName: "",
    email: "",
    attending: "",
    bringingGuest: "",
    guestFirstName: "",
    guestLastName: "",
    foodRestrictions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string, name: string) => {
    if (name === "attending" && value === "no") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        bringingGuest: "",
        guestFirstName: "",
        guestLastName: "",
        foodRestrictions: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
        firstName: "",
        lastName: "",
        email: "",
        attending: "",
        bringingGuest: "",
        guestFirstName: "",
        guestLastName: "",
        foodRestrictions: "",
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
     <div className="mb-12">
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
      />
    </div>
  </div>
</div>

    </form>
  );
}
