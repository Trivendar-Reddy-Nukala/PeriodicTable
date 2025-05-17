import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';
import { elements, categories, getCategoryColor, Element } from '../data/elements';

// Theme interface
interface Theme {
  background: string;
  text: string;
  cardBackground: string;
  overlay: string;
}

const lightTheme: Theme = {
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  text: '#333',
  cardBackground: 'rgba(255, 255, 255, 0.98)',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

const darkTheme: Theme = {
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  text: '#fff',
  cardBackground: 'rgba(30, 30, 30, 0.98)',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

const TableContainer = styled.div<{ $theme: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background: ${props => props.$theme.background};
  overflow-x: auto;
  width: 100%;
  transition: background 0.3s ease;
`;

const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(18, minmax(60px, 1fr));
  gap: 3px;
  padding: 1rem;
  max-width: 100%;
  min-width: min-content;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

const LanthanideActinideContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(15, minmax(60px, 1fr));
  gap: 3px;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// Animation keyframes
const vaporAnimation = keyframes`
  0% {
    opacity: 0.4;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translateY(-5px) scale(1.1);
  }
  100% {
    opacity: 0.4;
    transform: translateY(0) scale(1);
  }
`;

const neonGlow = keyframes`
  0% {
    box-shadow: 0 0 5px rgb(0 255 255 / 0.5),
                0 0 10px rgb(0 255 255 / 0.3),
                0 0 15px rgb(0 255 255 / 0.2);
  }
  50% {
    box-shadow: 0 0 10px rgb(0 255 255 / 0.7),
                0 0 20px rgb(0 255 255 / 0.5),
                0 0 30px rgb(0 255 255 / 0.3);
  }
  100% {
    box-shadow: 0 0 5px rgb(0 255 255 / 0.5),
                0 0 10px rgb(0 255 255 / 0.3),
                0 0 15px rgb(0 255 255 / 0.2);
  }
`;

const radioactiveGlow = keyframes`
  0% {
    box-shadow: 0 0 5px rgb(255 255 0 / 0.5),
                0 0 10px rgb(255 255 0 / 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgb(255 255 0 / 0.7),
                0 0 25px rgb(255 255 0 / 0.5);
  }
  100% {
    box-shadow: 0 0 5px rgb(255 255 0 / 0.5),
                0 0 10px rgb(255 255 0 / 0.3);
  }
`;

const orbitAnimation = keyframes`
  0% {
    transform: rotate(0deg) translateX(20px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(20px) rotate(-360deg);
  }
`;

// Add electron orbit animations
const electronOrbitAnimation = keyframes`
  0% {
    transform: rotate(0deg) translateX(15px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(15px) rotate(-360deg);
  }
`;

const ElectronOrbit = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  transition: opacity 0.3s ease;
`;

const Electron = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transform-origin: 15px 0;
  animation: ${electronOrbitAnimation} 3s infinite linear;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
`;

// Styled components for effects
const VaporEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: 8px;
  opacity: 1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgb(255 255 255 / 0.2) 0%, rgb(255 255 255 / 0) 100%);
    animation: ${vaporAnimation} 3s infinite ease-in-out;
  }

  &::after {
    animation-delay: 1.5s;
  }
`;

const OrbitParticle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgb(255 255 255 / 0.5);
  border-radius: 50%;
  animation: ${orbitAnimation} 3s infinite linear;
`;

const ElementCard = styled(motion.div)<{ $color: string; $theme: Theme; $group: number; $period: number; $category: string; $symbol: string; $number: number }>`
  aspect-ratio: 1;
  padding: 0.5rem;
  background: ${props => props.$color};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  min-width: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  grid-column: ${props => props.$group};
  grid-row: ${props => props.$period};
  overflow: hidden;

  ${props => props.$number <= 21 && props.$category === 'noble gas' && `
    animation: ${neonGlow} 2s infinite ease-in-out;
  `}

  ${props => props.$number <= 21 && ['U', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr'].includes(props.$symbol) && `
    animation: ${radioactiveGlow} 2s infinite ease-in-out;
  `}

  ${props => props.$number <= 21 && ['H', 'N', 'O', 'F', 'Cl', 'He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(props.$symbol) && `
    ${VaporEffect} {
      opacity: 1;
    }
  `}

  ${props => {
    const valenceElectrons = {
      'H': 1, 'Li': 1, 'Na': 1, 'K': 1, 'Rb': 1, 'Cs': 1, 'Fr': 1,
      'Be': 2, 'Mg': 2, 'Ca': 2, 'Sr': 2, 'Ba': 2, 'Ra': 2,
      'B': 3, 'Al': 3, 'Ga': 3, 'In': 3, 'Tl': 3,
      'C': 4, 'Si': 4, 'Ge': 4, 'Sn': 4, 'Pb': 4,
      'N': 5, 'P': 5, 'As': 5, 'Sb': 5, 'Bi': 5,
      'O': 6, 'S': 6, 'Se': 6, 'Te': 6, 'Po': 6,
      'F': 7, 'Cl': 7, 'Br': 7, 'I': 7, 'At': 7,
      'He': 2, 'Ne': 8, 'Ar': 8, 'Kr': 8, 'Xe': 8, 'Rn': 8
    }[props.$symbol] || 0;

    return props.$number <= 21 ? `
      ${ElectronOrbit} {
        opacity: 1;
      }

      ${Array.from({ length: valenceElectrons }).map((_, i) => `
        ${Electron}:nth-child(${i + 1}) {
          animation-delay: ${i * (3 / valenceElectrons)}s;
        }
      `).join('')}
    ` : '';
  }}

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
`;

const ElementImage = styled(motion.img)`
  width: 100%;
  height: 40px;
  object-fit: contain;
  margin-bottom: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
`;

const DetailCard = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.98);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  max-width: 90vw;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform-origin: center;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
  padding: 0 1rem;
  max-width: 100%;
  overflow-x: auto;
`;

const FilterButton = styled(motion.button)<{ $active: boolean; $theme: Theme }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.$active 
    ? props.$theme === darkTheme 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.1)'
    : props.$theme === darkTheme 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)'
  };
  color: ${props => props.$theme.text};
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active 
      ? props.$theme === darkTheme 
        ? 'rgba(255, 255, 255, 0.3)' 
        : 'rgba(0, 0, 0, 0.15)'
      : props.$theme === darkTheme 
        ? 'rgba(255, 255, 255, 0.2)' 
        : 'rgba(0, 0, 0, 0.1)'
    };
  }
`;

const ElementSymbol = styled(motion.div)<{ $theme: Theme }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.$theme.text};
  text-align: center;
  margin-top: 0.8rem;
`;

const ElementNumber = styled(motion.div)<{ $theme: Theme }>`
  font-size: 0.7rem;
  color: ${props => props.$theme.text};
  opacity: 0.8;
  position: absolute;
  top: 2px;
  left: 4px;
  font-weight: 500;
`;

const ElementName = styled(motion.div)<{ $theme: Theme }>`
  font-size: 0.6rem;
  color: ${props => props.$theme.text};
  text-align: center;
  margin-top: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ElementMass = styled(motion.div)<{ $theme: Theme }>`
  font-size: 0.6rem;
  color: ${props => props.$theme.text};
  opacity: 0.8;
  text-align: center;
  margin-top: 0.1rem;
`;

const DetailInfo = styled.div`
  margin-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
`;

const DetailTitle = styled(motion.h2)`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-align: center;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.98);
  padding: 1rem 0;
  z-index: 1;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%;
`;

const DetailText = styled(motion.p)`
  color: #444;
  margin: 0.8rem 0;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    transform: translateX(5px);
  }

  span:first-child {
    font-weight: 500;
    color: #666;
  }

  span:last-child {
    font-weight: 600;
    color: #333;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #333;
  }
`;

const ScrollHint = styled(motion.div)`
  color: white;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.7;
`;

const Tooltip = styled(motion.div)<{ $theme: Theme }>`
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.$theme.cardBackground};
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 220px;
  pointer-events: none;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 1;
  transform-origin: bottom center;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${props => props.$theme.cardBackground};
  }
`;

const TooltipContent = styled.div<{ $theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TooltipRow = styled.div<{ $theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: ${props => props.$theme.background};
  border-radius: 6px;
  font-size: 0.9rem;

  span:first-child {
    color: ${props => props.$theme.text};
    opacity: 0.8;
  }

  span:last-child {
    color: ${props => props.$theme.text};
    font-weight: 600;
  }
`;

const ThemeToggle = styled(motion.button)<{ $theme: Theme }>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: ${props => props.$theme === darkTheme 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)'};
  border: none;
  color: ${props => props.$theme.text};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$theme === darkTheme 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const PeriodicTable: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const filteredElements = elements.filter(element => {
    if (selectedCategory && element.category !== selectedCategory) return false;
    if (selectedPeriod && element.period !== selectedPeriod) return false;
    if (selectedGroup && element.group !== selectedGroup) return false;
    return true;
  });

  const mainElements = filteredElements.filter(element => 
    element.period <= 7 && !['lanthanide', 'actinide'].includes(element.category)
  );

  const lanthanides = filteredElements.filter(element => 
    element.category === 'lanthanide'
  );

  const actinides = filteredElements.filter(element => 
    element.category === 'actinide'
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Update the ElementCard rendering in the JSX
  const renderElectronOrbits = (symbol: string) => {
    const valenceElectrons = {
      'H': 1, 'Li': 1, 'Na': 1, 'K': 1, 'Rb': 1, 'Cs': 1, 'Fr': 1,
      'Be': 2, 'Mg': 2, 'Ca': 2, 'Sr': 2, 'Ba': 2, 'Ra': 2,
      'B': 3, 'Al': 3, 'Ga': 3, 'In': 3, 'Tl': 3,
      'C': 4, 'Si': 4, 'Ge': 4, 'Sn': 4, 'Pb': 4,
      'N': 5, 'P': 5, 'As': 5, 'Sb': 5, 'Bi': 5,
      'O': 6, 'S': 6, 'Se': 6, 'Te': 6, 'Po': 6,
      'F': 7, 'Cl': 7, 'Br': 7, 'I': 7, 'At': 7,
      'He': 2, 'Ne': 8, 'Ar': 8, 'Kr': 8, 'Xe': 8, 'Rn': 8
    }[symbol] || 0;

    return (
      <ElectronOrbit>
        {Array.from({ length: valenceElectrons }).map((_, i) => (
          <Electron key={i} />
        ))}
      </ElectronOrbit>
    );
  };

  return (
    <TableContainer $theme={theme}>
      <ThemeToggle
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        $theme={theme}
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </ThemeToggle>

      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            $active={selectedCategory === category}
            $theme={theme}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <TableWrapper>
        <AnimatePresence>
          {mainElements.map(element => (
            <ElementCard
              key={element.symbol}
              $color={getCategoryColor(element.category)}
              $theme={theme}
              $group={element.group}
              $period={element.period}
              $category={element.category}
              $symbol={element.symbol}
              $number={element.number}
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onHoverStart={() => setHoveredElement(element)}
              onHoverEnd={() => setHoveredElement(null)}
            >
              {element.number <= 21 && renderElectronOrbits(element.symbol)}
              {element.number <= 21 && ['H', 'N', 'O', 'F', 'Cl', 'He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(element.symbol) && (
                <VaporEffect />
              )}
              
              {['metal', 'transition metal', 'post-transition metal'].includes(element.category) && (
                <>
                  <OrbitParticle style={{ animationDelay: '0s' }} />
                  <OrbitParticle style={{ animationDelay: '1s' }} />
                  <OrbitParticle style={{ animationDelay: '2s' }} />
                </>
              )}

              <ElementNumber $theme={theme}>{element.number}</ElementNumber>
              <ElementSymbol $theme={theme}>{element.symbol}</ElementSymbol>
              <ElementImage
                src={`/images/elements/${element.symbol.toLowerCase()}.png`}
                alt={element.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <ElementName $theme={theme}>{element.name}</ElementName>
              <ElementMass $theme={theme}>{element.atomic_mass.toFixed(2)}</ElementMass>

              <AnimatePresence>
                {hoveredElement?.symbol === element.symbol && (
                  <Tooltip
                    $theme={theme}
                    variants={tooltipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <TooltipContent $theme={theme}>
                      <TooltipRow $theme={theme}>
                        <span>Atomic Number</span>
                        <span>{element.number}</span>
                      </TooltipRow>
                      <TooltipRow $theme={theme}>
                        <span>Atomic Mass</span>
                        <span>{element.atomic_mass}</span>
                      </TooltipRow>
                      <TooltipRow $theme={theme}>
                        <span>Category</span>
                        <span>{element.category}</span>
                      </TooltipRow>
                      <TooltipRow $theme={theme}>
                        <span>Block</span>
                        <span>{element.block}</span>
                      </TooltipRow>
                    </TooltipContent>
                  </Tooltip>
                )}
              </AnimatePresence>
            </ElementCard>
          ))}
        </AnimatePresence>
      </TableWrapper>

      <LanthanideActinideContainer>
        <AnimatePresence>
          {lanthanides.map(element => (
            <ElementCard
              key={element.symbol}
              $color={getCategoryColor(element.category)}
              $theme={theme}
              $group={element.number - 57 + 3}
              $period={1}
              $category={element.category}
              $symbol={element.symbol}
              $number={element.number}
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onHoverStart={() => setHoveredElement(element)}
              onHoverEnd={() => setHoveredElement(null)}
            >
              {element.number <= 21 && renderElectronOrbits(element.symbol)}
              {element.number <= 21 && ['H', 'N', 'O', 'F', 'Cl', 'He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(element.symbol) && (
                <VaporEffect />
              )}
              
              {['metal', 'transition metal', 'post-transition metal'].includes(element.category) && (
                <>
                  <OrbitParticle style={{ animationDelay: '0s' }} />
                  <OrbitParticle style={{ animationDelay: '1s' }} />
                  <OrbitParticle style={{ animationDelay: '2s' }} />
                </>
              )}

              <ElementNumber $theme={theme}>{element.number}</ElementNumber>
              <ElementSymbol $theme={theme}>{element.symbol}</ElementSymbol>
              <ElementImage
                src={`/images/elements/${element.symbol.toLowerCase()}.png`}
                alt={element.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <ElementName $theme={theme}>{element.name}</ElementName>
              <ElementMass $theme={theme}>{element.atomic_mass.toFixed(2)}</ElementMass>

              <AnimatePresence>
                {hoveredElement?.symbol === element.symbol && (
                  <Tooltip
                    $theme={theme}
                    variants={tooltipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <TooltipContent $theme={theme}>
                      <TooltipRow $theme={theme}>
                        <span>Atomic Number</span>
                        <span>{element.number}</span>
                      </TooltipRow>
                      <TooltipRow $theme={theme}>
                        <span>Atomic Mass</span>
                        <span>{element.atomic_mass}</span>
                      </TooltipRow>
                      <TooltipRow $theme={theme}>
                        <span>Category</span>
                        <span>{element.category}</span>
                      </TooltipRow>
                      <TooltipRow $theme={theme}>
                        <span>Block</span>
                        <span>{element.block}</span>
                      </TooltipRow>
                    </TooltipContent>
                  </Tooltip>
                )}
              </AnimatePresence>
            </ElementCard>
          ))}
        </AnimatePresence>
      </LanthanideActinideContainer>

      <LanthanideActinideContainer>
        <AnimatePresence>
          {actinides.map(element => (
            <ElementCard
              key={element.symbol}
              $color={getCategoryColor(element.category)}
              $theme={theme}
              $group={element.number - 89 + 3}
              $period={1}
              $category={element.category}
              $symbol={element.symbol}
              $number={element.number}
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onHoverStart={() => setHoveredElement(element)}
              onHoverEnd={() => setHoveredElement(null)}
            >
              {element.number <= 21 && renderElectronOrbits(element.symbol)}
              {element.number <= 21 && ['H', 'N', 'O', 'F', 'Cl', 'He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(element.symbol) && (
                <VaporEffect />
              )}
              
              {['metal', 'transition metal', 'post-transition metal'].includes(element.category) && (
                <>
                  <OrbitParticle style={{ animationDelay: '0s' }} />
                  <OrbitParticle style={{ animationDelay: '1s' }} />
                  <OrbitParticle style={{ animationDelay: '2s' }} />
                </>
              )}

              <ElementNumber $theme={theme}>{element.number}</ElementNumber>
              <ElementSymbol $theme={theme}>{element.symbol}</ElementSymbol>
              <ElementImage
                src={`/images/elements/${element.symbol.toLowerCase()}.png`}
                alt={element.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <ElementName $theme={theme}>{element.name}</ElementName>
              <ElementMass $theme={theme}>{element.atomic_mass.toFixed(2)}</ElementMass>

              <AnimatePresence>
                {hoveredElement?.symbol === element.symbol && (
                  <Tooltip
                    $theme={theme}
                    variants={tooltipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <TooltipContent $theme={theme}>
                      <TooltipRow $theme={theme}>
                        <span>Atomic Number</span>
                        <span>{element.number}</span>
                      </TooltipRow>
                      <TooltipRow $theme={theme}>
                        <span>Atomic Mass</span>
                        <span>{element.atomic_mass}</span>
                      </TooltipRow>
                      <TooltipRow $theme={theme}>
                        <span>Category</span>
                        <span>{element.category}</span>
                      </TooltipRow>
                      <TooltipRow $theme={theme}>
                        <span>Block</span>
                        <span>{element.block}</span>
                      </TooltipRow>
                    </TooltipContent>
                  </Tooltip>
                )}
              </AnimatePresence>
            </ElementCard>
          ))}
        </AnimatePresence>
      </LanthanideActinideContainer>
    </TableContainer>
  );
};

export default PeriodicTable; 