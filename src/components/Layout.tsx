import { useEffect, useState } from 'react'
import { Entries, Entry, View } from '../types'
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import CalendarGrid from './CalendarCardsView'
import AuthButton from './AuthButton';

interface LayoutProps {
  currentView: View
  setCurrentView: (view: View) => void
  initialEntries: Entries
}

type Pig = {
  id: string
  startX: number
  yLevel: number
  calculatedDuration: number
  direction: 'left' | 'right'
}

const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Logged in user:", result.user.uid);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export default function Layout({ currentView, setCurrentView, initialEntries }: LayoutProps) {
  const [entries, setEntries] = useState<Entries>(initialEntries);
  const [pigs, setPigs] = useState<Pig[]>([])
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Track screen width
  const pigSizeDim = 64; 

  useEffect(() => {
    const handleKeyPress = () => {
      const width = window.innerWidth;
      const batchSize = 10;
      const newPigs: Pig[] = [];

      for (let i = 0; i < batchSize; i++) {
        let startX = Math.random() * Math.max(0, width - pigSizeDim);
        let yLevel = Math.floor(Math.random() * 4) * 40;
        let randSpeed = Math.floor(Math.random() * 50) + 25;

        let direction: 'left' | 'right';
        switch (true) {
          case startX <= width * 0.2:
            direction = 'right';
            break;
          case startX >= width * 0.8:
            direction = 'left';
            break;
          default:
            direction = Math.random() < 0.5 ? 'left' : 'right';
            break;
        }

        const distance = direction === 'right' ? (width - pigSizeDim - startX) : startX;
        const calculatedDuration = Math.random() < 0.75 ? distance / randSpeed : 0;

        const newPig: Pig = {
          id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}-${i}`,
          startX,
          yLevel,
          calculatedDuration,
          direction
        };

        newPigs.push(newPig);

        window.setTimeout(() => {
          setPigs((current) => current.filter((pig) => pig.id !== newPig.id));
        }, 10000);
      }
      setPigs((prev) => [...prev, ...newPigs]);
    };

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px', 
        margin: '0 auto',   
        padding: '0 24px',  
        height: '80px',
        borderBottom: '1px solid #eee' 
      }}>
        <h1 style={{ fontSize: '24px', margin: 0 }}>LTF's LDC</h1>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px', 
        }}>
          {[
            { id: 'today', label: 'Notepad' },
            { id: 'calendar', label: 'Calendar' },
            { id: 'archive', label: 'Archive' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 0',
                fontSize: '14px',
                fontWeight: currentView === item.id ? '600' : '400',
                color: currentView === item.id ? '#000' : '#666',
                cursor: 'pointer',
                position: 'relative',
                transition: 'color 0.2s ease',
                borderBottom: currentView === item.id ? '2px solid #FFD700' : '2px solid transparent'
              }}
              onMouseOver={(e) => {
                if (currentView !== item.id) e.currentTarget.style.color = '#000';
              }}
              onMouseOut={(e) => {
                if (currentView !== item.id) e.currentTarget.style.color = '#666';
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <AuthButton />
      </header>
      <main>
        {currentView === 'calendar' && <CalendarGrid entries={entries} setEntries={setEntries} />}
        {currentView === 'today' && <div>Notepad view</div>}
        {currentView === 'archive' && <div>Archive view</div>}
      </main>

      {pigs.map((pig) => (
        <div
          key={pig.id}
          className="easter-egg-pig-container"
          style={{
            left: `${pig.startX}px`,
            '--size-px': `${pigSizeDim}px`,
            '--bottom-px': `${pig.yLevel}px`,
            '--walk-speed': `${pig.calculatedDuration}s`,
            '--screen-width': `${screenWidth}px`,
            '--start-x': `${pig.startX}px`,
            '--walk-animation': pig.direction === 'left' ? 'pig-walk-left' : 'pig-walk-right'
          } as React.CSSProperties}
        >
          <div className={`pig-sprite ${pig.direction}`} />
        </div>
      ))}

    </div>
  )
}