import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

// ── dados ──────────────────────────────────────────────────────────────────
const NAMES = [
  'Ana Beatriz', 'Carla', 'Fernanda', 'Juliana', 'Mariana',
  'Patrícia', 'Renata', 'Camila', 'Larissa', 'Simone',
  'Rosana', 'Aline', 'Beatriz', 'Claudia', 'Daniela',
  'Elaine', 'Gabriela', 'Helena', 'Isabela', 'Jéssica',
  'Karina', 'Letícia', 'Michele', 'Natália', 'Priscila',
  'Rafaela', 'Sabrina', 'Tatiane', 'Viviane', 'Yasmin',
  'Lucas', 'Rafael', 'Carlos',
];

const REGIONS = [
  'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG',
  'Salvador, BA', 'Fortaleza, CE', 'Curitiba, PR',
  'Manaus, AM', 'Recife, PE', 'Porto Alegre, RS', 'Goiânia, GO',
  'Belém, PA', 'Florianópolis, SC', 'Maceió, AL', 'Natal, RN',
  'Campo Grande, MS', 'Teresina, PI', 'Aracaju, SE', 'Macapá, AP',
];

const TIMES = [
  'há 2 minutos', 'há 5 minutos', 'há 8 minutos', 'há 12 minutos',
  'há 15 minutos', 'há 23 minutos', 'há 31 minutos', 'há 45 minutos',
  'há 1 hora', 'há 1h 20min',
];

const PACKAGES = [
  { label: 'Pacote Básico', color: 'text-orange-500' },
  { label: 'Pacote Premium', color: 'text-emerald-500' },
];

// ── helpers ─────────────────────────────────────────────────────────────────
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Sale {
  id: number;
  name: string;
  region: string;
  time: string;
  pkg: { label: string; color: string };
}

function randomSale(id: number): Sale {
  return {
    id,
    name: pick(NAMES),
    region: pick(REGIONS),
    time: pick(TIMES),
    pkg: pick(PACKAGES),
  };
}

// ── component ────────────────────────────────────────────────────────────────
const VISIBLE_MS  = 5000;   // quanto tempo fica visível
const INTERVAL_MS = 40000;  // intervalo entre notificações (40 segundos)

export default function SalesNotification() {
  const [sale, setSale] = useState<Sale | null>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // primeira notificação após 3 s
    const first = setTimeout(() => {
      setSale(randomSale(0));
      setCounter(1);
    }, 3000);
    return () => clearTimeout(first);
  }, []);

  useEffect(() => {
    if (counter === 0) return;

    // esconde após VISIBLE_MS
    const hide = setTimeout(() => setSale(null), VISIBLE_MS);

    // próxima notificação
    const next = setTimeout(() => {
      setSale(randomSale(counter));
      setCounter((c) => c + 1);
    }, INTERVAL_MS);

    return () => {
      clearTimeout(hide);
      clearTimeout(next);
    };
  }, [counter]);

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none" style={{ maxWidth: 320 }}>
      <AnimatePresence>
        {sale && (
          <motion.div
            key={sale.id}
            initial={{ x: '120%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '120%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-start gap-3 w-[300px]"
          >
            {/* ícone */}
            <div className="shrink-0 bg-green-100 rounded-xl p-2 mt-0.5">
              <ShoppingBag className="w-5 h-5 text-green-600" />
            </div>

            {/* conteúdo */}
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[13px] font-bold text-gray-900 truncate">
                {sale.name}
              </p>
              <p className="text-[11px] text-gray-500 truncate">
                {sale.region} · {sale.time}
              </p>
              <p className={`text-[12px] font-semibold ${sale.pkg.color}`}>
                Comprou o {sale.pkg.label}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
