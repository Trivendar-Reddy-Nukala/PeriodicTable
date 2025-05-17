import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
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

const ElementCard = styled(motion.div)<{ $color: string; $theme: Theme; $group: number; $period: number }>`
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

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    z-index: 2;

    img {
      opacity: 1;
    }
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
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$theme.text};
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.$theme.cardBackground};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 10;
  width: 200px;
  pointer-events: none;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ThemeToggle = styled(motion.button)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  z-index: 1000;
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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <TableContainer $theme={theme}>
      <ThemeToggle
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </ThemeToggle>

      <Title style={{ color: theme.text }}>Periodic Table</Title>

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
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onHoverStart={() => setHoveredElement(element)}
              onHoverEnd={() => setHoveredElement(null)}
            >
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
                    <DetailText style={{ color: theme.text }}>
                      <span>Atomic Number:</span>
                      <span>{element.number}</span>
                    </DetailText>
                    <DetailText style={{ color: theme.text }}>
                      <span>Atomic Mass:</span>
                      <span>{element.atomic_mass}</span>
                    </DetailText>
                    <DetailText style={{ color: theme.text }}>
                      <span>Category:</span>
                      <span>{element.category}</span>
                    </DetailText>
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
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onHoverStart={() => setHoveredElement(element)}
              onHoverEnd={() => setHoveredElement(null)}
            >
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
                    <DetailText style={{ color: theme.text }}>
                      <span>Atomic Number:</span>
                      <span>{element.number}</span>
                    </DetailText>
                    <DetailText style={{ color: theme.text }}>
                      <span>Atomic Mass:</span>
                      <span>{element.atomic_mass}</span>
                    </DetailText>
                    <DetailText style={{ color: theme.text }}>
                      <span>Category:</span>
                      <span>{element.category}</span>
                    </DetailText>
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
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onHoverStart={() => setHoveredElement(element)}
              onHoverEnd={() => setHoveredElement(null)}
            >
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
                    <DetailText style={{ color: theme.text }}>
                      <span>Atomic Number:</span>
                      <span>{element.number}</span>
                    </DetailText>
                    <DetailText style={{ color: theme.text }}>
                      <span>Atomic Mass:</span>
                      <span>{element.atomic_mass}</span>
                    </DetailText>
                    <DetailText style={{ color: theme.text }}>
                      <span>Category:</span>
                      <span>{element.category}</span>
                    </DetailText>
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