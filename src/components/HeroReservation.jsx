import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Users, Minus, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from 'date-fns/locale';

const HeroReservation = () => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState({ from: undefined, to: undefined });
  const [currentPicker, setCurrentPicker] = useState('from'); // 'from' or 'to'
  const { toast } = useToast();

  const handleDateSelect = (selectedDate) => {
    if (currentPicker === 'from') {
      setDate({ from: selectedDate, to: undefined });
      setCurrentPicker('to');
    } else {
      if (selectedDate && date.from && selectedDate < date.from) {
        setDate({ from: selectedDate, to: undefined });
        setCurrentPicker('to');
      } else {
        setDate({ ...date, to: selectedDate });
        setCurrentPicker('from');
      }
    }
  };


  const handleReservation = () => {
    if (!date.from || !date.to) {
        toast({
            title: "Fechas incompletas",
            description: "Por favor selecciona un rango de fechas.",
            variant: "destructive",
        });
        return;
    }
    document.getElementById('reservar').scrollIntoView({ behavior: 'smooth' });
    toast({
        title: "¡Excelente!",
        description: "Completa tus datos para finalizar la reserva.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full max-w-4xl lg:glass-dark lg:rounded-full p-2 lg:p-3 flex flex-col lg:flex-row items-center justify-between gap-2 shadow-2xl"
    >
      {/* Desktop View */}
      <div className="hidden lg:flex flex-1 w-full lg:w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left h-14 rounded-full text-base bg-transparent border-none text-white hover:bg-white/10 hover:text-white font-light",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 icon-custom-color" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                    {format(date.to, "LLL dd, y", { locale: es })}
                  </>
                ) : (
                  format(date.from, "LLL dd, y", { locale: es })
                )
              ) : (
                <span>Check in - Check out</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 glass-dark border-white/20" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={es}
              className="text-white"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Mobile View */}
       <div className="w-full lg:hidden glass-dark rounded-2xl p-4 flex flex-col gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-left h-auto p-0 text-white hover:bg-transparent hover:text-white font-light">
                <div className="flex items-center">
                    <CalendarIcon className="mr-3 h-5 w-5 icon-custom-color" />
                    <div>
                        <span className="text-xs text-gray-400 font-light">Check in - Check out</span>
                        <p className="font-light">
                            {date?.from ? format(date.from, "EEE, dd MMM", { locale: es }) : 'Elige fecha'}
                            {date?.to ? ` - ${format(date.to, "EEE, dd MMM", { locale: es })}` : ''}
                        </p>
                    </div>
                </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 glass-dark border-white/20" align="center">
            <Calendar
                mode="single"
                selected={currentPicker === 'from' ? date.from : date.to}
                onSelect={handleDateSelect}
                fromDate={currentPicker === 'to' ? date.from : new Date()}
                initialFocus
                locale={es}
                className="text-white"
                footer={<p className="text-center text-sm text-[#c0e69b] p-2 font-light">
                    {currentPicker === 'from' ? "Selecciona la fecha de llegada" : "Selecciona la fecha de salida"}
                </p>}
            />
          </PopoverContent>
        </Popover>
        
        <div className="w-full h-px bg-white/10"></div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-left h-auto p-0 text-white hover:bg-transparent hover:text-white font-light">
                <div className="flex items-center">
                    <Users className="mr-3 h-5 w-5 icon-custom-color" />
                    <div>
                        <span className="text-xs text-gray-400 font-light">Huéspedes</span>
                        <p className="font-light">{adults} Adultos, {children} Niños</p>
                    </div>
                </div>
            </Button>
          </PopoverTrigger>
           <PopoverContent className="w-60 glass-dark border-white/20 text-white p-4">
            <div className="space-y-4">
                <div className="flex items-center justify-between font-light">
                    <span>Adultos</span>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-7 w-7 bg-white/10 border-none" onClick={() => setAdults(p => Math.max(1, p - 1))}><Minus className="h-4 w-4" /></Button>
                        <span>{adults}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7 bg-white/10 border-none" onClick={() => setAdults(p => p + 1)}><Plus className="h-4 w-4" /></Button>
                    </div>
                </div>
                 <div className="flex items-center justify-between font-light">
                    <span>Niños</span>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-7 w-7 bg-white/10 border-none" onClick={() => setChildren(p => Math.max(0, p - 1))}><Minus className="h-4 w-4" /></Button>
                        <span>{children}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7 bg-white/10 border-none" onClick={() => setChildren(p => p + 1)}><Plus className="h-4 w-4" /></Button>
                    </div>
                </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button onClick={handleReservation} className="btn-custom w-full rounded-xl py-4 text-base mt-2 font-normal">
            Reservar Ahora
        </Button>
      </div>

      {/* Common Desktop elements */}
      <div className="w-px h-8 bg-white/20 hidden lg:block"></div>

      <div className="hidden lg:flex flex-1 w-full lg:w-auto">
         <Popover>
          <PopoverTrigger asChild>
             <Button
                variant={"outline"}
                className="w-full justify-start text-left h-14 rounded-full text-base bg-transparent border-none text-white hover:bg-white/10 hover:text-white font-light"
              >
              <Users className="mr-2 h-4 w-4 icon-custom-color" />
              <span>{adults} Adultos, {children} Niños</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 glass-dark border-white/20 text-white p-4">
            <div className="space-y-4">
                <div className="flex items-center justify-between font-light">
                    <span>Adultos</span>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-7 w-7 bg-white/10 border-none" onClick={() => setAdults(p => Math.max(1, p - 1))}><Minus className="h-4 w-4" /></Button>
                        <span>{adults}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7 bg-white/10 border-none" onClick={() => setAdults(p => p + 1)}><Plus className="h-4 w-4" /></Button>
                    </div>
                </div>
                 <div className="flex items-center justify-between font-light">
                    <span>Niños</span>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-7 w-7 bg-white/10 border-none" onClick={() => setChildren(p => Math.max(0, p - 1))}><Minus className="h-4 w-4" /></Button>
                        <span>{children}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7 bg-white/10 border-none" onClick={() => setChildren(p => p + 1)}><Plus className="h-4 w-4" /></Button>
                    </div>
                </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Button
        onClick={handleReservation}
        className="btn-custom px-8 h-14 w-full lg:w-auto rounded-full text-base hidden lg:flex font-normal"
      >
        Reservar
      </Button>
    </motion.div>
  );
};

export default HeroReservation;