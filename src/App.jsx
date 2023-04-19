import './styles/main.css';
import BirthdatePicker from './components/BirthdatePicker';
import DateResult from './components/DateResult';
import { useState } from 'react';

export default function App() {
  const [ day, setDay ] = useState(null);
  const [ month, setMonth ] = useState(null);
  const [ year, setYear ] = useState(null);

  return (
    <>
      <BirthdatePicker date={{ day, month, year }} setDate={{ setDay, setMonth, setYear }} />
      <DateResult date={{ day, month, year }} />
    </>
  );
}