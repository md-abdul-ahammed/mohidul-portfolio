import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import flags from 'react-phone-number-input/flags';

export default function PhoneNumberInput() {
  const [value, setValue] = useState('');

  return (
    <div className="flex items-center border border-[#D3D8DF] rounded-lg">
      <PhoneInput
        className="flex-1 py-2 px-4 text-sm outline-none"
        international
        defaultCountry="US"
        value={value}
        onChange={setValue}
        flags={flags}
        placeholder="Enter phone number"
      />
    </div>
  );
}
