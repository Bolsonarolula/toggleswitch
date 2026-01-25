import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Switch } from "@/components/ui/switch";

const Index = () => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [rememberCpf, setRememberCpf] = useState(true);

  const handleEnter = () => {
    navigate("/withdraw");
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-serif max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 bg-background">
        {/* Logo placeholder */}
        <div className="w-28 h-9 bg-foreground rounded-sm" />
        
        {/* Menu button */}
        <button className="flex items-center gap-2 text-foreground">
          <Menu className="w-6 h-6" strokeWidth={2} />
          <span className="text-base font-normal">Menu</span>
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-3 bg-background">
        {/* Card/Image placeholder */}
        <div className="w-full aspect-square bg-card rounded-[2rem] mb-4" />

        {/* Text content */}
        <div className="px-3 py-2">
          <p className="text-foreground text-base mb-1">
            Resgate Seu Dinheiro
          </p>
          
          <h1 className="text-foreground text-[1.75rem] leading-[1.2] font-normal mb-6">
            Resgate os fundos de sua conta através do fundo garantidor de crédito Will Bank.
          </h1>

          {/* CTA Button with Drawer */}
          <Drawer>
            <DrawerTrigger asChild>
              <button className="w-full py-4 bg-secondary text-foreground border-2 border-foreground rounded-full text-lg font-normal tracking-wide mb-6">
                INICIAR
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-background border-0 rounded-t-[2rem] px-6 pb-8">
              {/* Drawer Handle */}
              <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-muted-foreground/30" />
              
              <div className="mt-6">
                {/* CPF Label */}
                <label className="text-foreground text-lg font-normal block mb-2">
                  Digite seu CPF
                </label>
                
                {/* CPF Input */}
                <input
                  type="text"
                  value={cpf}
                  onChange={handleCpfChange}
                  placeholder="000.000.000-00"
                  className="w-full bg-transparent text-primary text-4xl font-serif placeholder:text-primary/50 border-0 outline-none py-2"
                  inputMode="numeric"
                />
                
                {/* Remember CPF Toggle */}
                <div className="flex items-center justify-between mt-6">
                  <span className="text-foreground text-lg font-normal">
                    Lembra CPF
                  </span>
                  <Switch
                    checked={rememberCpf}
                    onCheckedChange={setRememberCpf}
                    className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/30"
                  />
                </div>
                
                {/* Enter Button */}
                <button 
                  onClick={handleEnter}
                  className="w-full py-4 bg-primary text-foreground rounded-full text-xl font-normal mt-8"
                >
                  Entrar
                </button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-14 bg-footer" />
    </div>
  );
};

export default Index;
