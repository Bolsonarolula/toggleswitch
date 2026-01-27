import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import willBankLogo from "@/assets/will-bank-logo.png";

const Withdraw = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(300);
  const tax = Math.round(value * 0.15);

  return (
    <div className="min-h-screen bg-secondary flex flex-col max-w-md mx-auto" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 bg-white">
        {/* Logo */}
        <img src={willBankLogo} alt="Will Bank" className="h-11 w-auto" />
        
        {/* Menu button */}
        <button className="flex items-center gap-2 text-foreground">
          <Menu className="w-6 h-6" strokeWidth={2} />
          <span className="text-base" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>Menu</span>
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-6 pt-16">
        {/* Title */}
        <h1 className="text-foreground text-[1.75rem] leading-[1.2] font-normal text-center mb-8">
          Qual valor você deseja resgatar hoje ?
        </h1>

        {/* Value Display */}
        <p className="text-foreground text-5xl font-bold text-center mb-10">
          R$ {value}
        </p>

        {/* Slider */}
        <div className="mb-16">
          <Slider
            value={[value]}
            onValueChange={(vals) => setValue(vals[0])}
            min={100}
            max={1000}
            step={50}
            className="w-full"
          />
        </div>

        {/* CTA Button */}
        <button 
          onClick={() => navigate("/withdraw-form")}
          className="w-full py-3 bg-primary text-foreground rounded-md text-2xl mb-2"
          style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}
        >
          Solicitar Saque
        </button>

        {/* Tax Info */}
        <p className="text-foreground/70 text-sm text-center mb-1">
          A taxa do IOF será tributada sobre 15% do valor resgatado.
        </p>
        <p className="text-foreground text-base font-medium text-center">
          Taxa: R${tax}
        </p>
      </main>

      {/* Footer */}
      <footer className="h-14 bg-footer" />
    </div>
  );
};

export default Withdraw;
