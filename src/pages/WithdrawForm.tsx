import { useState, useEffect } from "react";
import { Ban } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const WithdrawForm = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [bancoDestinatario, setBancoDestinatario] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: boolean}>({});
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showBlockedScreen, setShowBlockedScreen] = useState(false);

  useEffect(() => {
    if (showLoadingModal && !showBlockedScreen) {
      const timer = setTimeout(() => {
        setShowBlockedScreen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLoadingModal, showBlockedScreen]);

  const handleShare = async () => {
    const shareData = {
      title: 'Will Bank',
      text: 'Confira o Will Bank!',
      url: window.location.origin,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Compartilhamento cancelado');
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    }
  };

  const handleSubmit = () => {
    const newErrors: {[key: string]: boolean} = {};
    
    if (!nomeCompleto.trim()) newErrors.nomeCompleto = true;
    if (!bancoDestinatario.trim()) newErrors.bancoDestinatario = true;
    if (!chavePix.trim()) newErrors.chavePix = true;
    if (!aceitaTermos) newErrors.aceitaTermos = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowLoadingModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col font-serif max-w-md mx-auto">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 flex flex-col px-4 pt-6 pb-8">
        {/* Form Card */}
        <div className="bg-secondary rounded-xl p-6 flex flex-col">
          {/* Title */}
          <h1 className="text-foreground text-[1.5rem] leading-[1.3] mb-6" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>
            Preencha o formulário para receber os valores solicitados.
          </h1>

          {/* Nome Completo */}
          <div className="mb-5">
            <label className="text-foreground text-lg block mb-2" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>
              Nome Completo
            </label>
            <input
              type="text"
              value={nomeCompleto}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
                setNomeCompleto(value);
              }}
              style={{ fontFamily: "'Open Sans', sans-serif" }}
              className={`w-full h-12 px-4 rounded-sm border bg-white text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.nomeCompleto ? "border-red-500" : "border-primary"
              }`}
            />
          </div>

          {/* Instituição Destinatária */}
          <div className="mb-5">
            <label className="text-foreground text-lg block mb-2" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>
              Instituição Destinatária
            </label>
            <select
              value={bancoDestinatario}
              onChange={(e) => setBancoDestinatario(e.target.value)}
              style={{ fontFamily: "'Open Sans', sans-serif" }}
              className={`w-full h-12 px-4 rounded-sm border bg-white text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.bancoDestinatario ? "border-red-500" : "border-primary"
              }`}
            >
              <option value="">Selecione uma instituição</option>
              <option value="001">Banco do Brasil</option>
              <option value="033">Santander</option>
              <option value="104">Caixa Econômica Federal</option>
              <option value="237">Bradesco</option>
              <option value="260">Nubank</option>
              <option value="290">PagBank</option>
              <option value="323">Mercado Pago</option>
              <option value="341">Itaú</option>
              <option value="380">PicPay</option>
              <option value="077">Inter</option>
              <option value="756">Sicoob</option>
              <option value="748">Sicredi</option>
              <option value="336">C6 Bank</option>
              <option value="212">Original</option>
              <option value="655">Neon</option>
              <option value="637">Sofisa Direto</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Chave Pix */}
          <div className="mb-6">
            <label className="text-foreground text-lg block mb-2" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>
              Chave Pix
            </label>
            <input
              type="text"
              value={chavePix}
              onChange={(e) => setChavePix(e.target.value)}
              style={{ fontFamily: "'Open Sans', sans-serif" }}
              className={`w-full h-12 px-4 rounded-sm border bg-white text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.chavePix ? "border-red-500" : "border-primary"
              }`}
            />
          </div>

          {/* Toggle Terms */}
          <div className={`flex items-center gap-3 mb-6 ${errors.aceitaTermos ? "text-red-500" : ""}`}>
            <Switch
              checked={aceitaTermos}
              onCheckedChange={setAceitaTermos}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/30"
            />
            <p className="text-foreground/80 text-[8px] leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Ao solicitar o saque para sua conta é necessário está de acordo com o pagamento de 15% do IOF (Imposto sobre Operações Financeiras)
            </p>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmit}
            className="w-full py-4 bg-primary text-foreground rounded-md text-xl"
            style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}
          >
            Próximo
          </button>
        </div>

        {/* Loading Modal */}
        <Dialog open={showLoadingModal} onOpenChange={(open) => {
          setShowLoadingModal(open);
          if (!open) setShowBlockedScreen(false);
        }}>
          <DialogContent className="bg-white rounded-2xl p-8 max-w-[340px] border-0 shadow-xl flex flex-col items-center gap-6 [&>button]:hidden">
            {!showBlockedScreen ? (
              <div className="w-full flex flex-col items-center gap-6">
                <h2 className="text-foreground text-2xl text-center" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>
                  Gerando Qrcode
                </h2>
                
                {/* Yellow Spinner */}
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="200"
                      strokeDashoffset="60"
                    />
                  </svg>
                </div>

                <p className="text-foreground/70 text-[10px] text-center leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  O pagamento da taxa IOF é obrigatória conforme a Lei nº 5.143, de 20 de outubro de 1966.
                </p>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-6">
                {/* Blocked Screen */}
                <h2 className="text-foreground text-2xl text-center" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}>
                  Pagamento bloqueado
                </h2>
                
                {/* Blocked Icon */}
                <div className="w-40 h-40 flex items-center justify-center">
                  <Ban className="w-36 h-36 text-red-600" strokeWidth={2.5} />
                </div>

                <p className="text-foreground text-xl text-center leading-snug" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600 }}>
                  Compartilhe este site com 5 pessoas para desbloquear.
                </p>

                {/* Share Button */}
                <button 
                  onClick={handleShare}
                  className="w-full py-4 bg-primary text-foreground rounded-md text-xl mt-2"
                  style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700 }}
                >
                  Compartilhar
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default WithdrawForm;
