import { Menu, X, Home, Wallet, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import willBankLogo from "@/assets/will-bank-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Início", icon: Home },
    { path: "/withdraw", label: "Solicitar Saque", icon: Wallet },
    { path: "/withdraw-form", label: "Formulário", icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="flex items-center justify-between px-5 py-4 bg-white">
      {/* Logo */}
      <img 
        src={willBankLogo} 
        alt="Will Bank" 
        className="h-11 w-auto cursor-pointer" 
        onClick={() => navigate("/")}
      />
      
      {/* Menu button with Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center gap-2 text-foreground">
            <Menu className="w-6 h-6" strokeWidth={2} />
            <span className="text-base" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>Menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] bg-white p-0 border-l-0 [&>button]:hidden">
          {/* Menu Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-muted">
            <img src={willBankLogo} alt="Will Bank" className="h-9 w-auto" />
            <SheetClose asChild>
              <button className="text-foreground p-1">
                <X className="w-6 h-6" strokeWidth={2} />
                <span className="sr-only">Fechar menu</span>
              </button>
            </SheetClose>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <SheetClose asChild key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-4 px-5 py-4 text-left transition-colors ${
                      isActive(item.path)
                        ? "bg-primary/10 text-primary border-r-4 border-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                    style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: isActive(item.path) ? 700 : 600 }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                    <span className="text-base">{item.label}</span>
                  </button>
                </SheetClose>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-muted">
            <p className="text-xs text-muted-foreground text-center" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Will Bank - Fundo Garantidor de Crédito
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
