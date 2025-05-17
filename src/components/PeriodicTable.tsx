import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { elements, categories, getCategoryColor, Element } from '../data/elements';

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  overflow-x: auto;
  width: 100%;
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
`;

const ElementCard = styled(motion.div)<{ $color: string }>`
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

const FilterButton = styled(motion.button)<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
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

const ElementSymbol = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  text-align: center;
  margin-top: 0.8rem;
`;

const ElementNumber = styled(motion.div)`
  font-size: 0.7rem;
  color: #666;
  position: absolute;
  top: 2px;
  left: 4px;
  font-weight: 500;
`;

const ElementName = styled(motion.div)`
  font-size: 0.6rem;
  color: #333;
  text-align: center;
  margin-top: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ElementMass = styled(motion.div)`
  font-size: 0.6rem;
  color: #666;
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

const PeriodicTable: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);

  const filteredElements = selectedCategory
    ? elements.filter(element => element.category === selectedCategory)
    : elements;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const elementVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const filterButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.3)"
    },
    tap: { scale: 0.95 }
  };

  const detailCardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 0,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 0,
      filter: "blur(10px)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const detailTextVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      filter: "blur(5px)"
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    })
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      filter: "blur(5px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.2,
        duration: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <TableContainer>
      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            variants={filterButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterButton>
        ))}
      </FilterContainer>
      <ScrollHint
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ← Scroll horizontally to see all elements →
      </ScrollHint>
      <TableWrapper
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredElements.map(element => (
          <ElementCard
            key={element.atomicNumber}
            $color={element.color}
            onClick={() => setHoveredElement(element)}
            style={{
              gridColumn: element.group,
              gridRow: element.period
            }}
            variants={elementVariants}
            whileHover="hover"
          >
            <ElementNumber
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {element.atomicNumber}
            </ElementNumber>
            <ElementSymbol
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {element.symbol}
            </ElementSymbol>
            <ElementName
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {element.name}
            </ElementName>
            <ElementMass
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {element.atomicMass.toFixed(2)}
            </ElementMass>
          </ElementCard>
        ))}
      </TableWrapper>
      <AnimatePresence mode="wait">
        {hoveredElement && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHoveredElement(null)}
            />
            <DetailCard
              variants={detailCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layoutId={`element-${hoveredElement.atomicNumber}`}
            >
              <CloseButton
                onClick={() => setHoveredElement(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </CloseButton>
              <DetailTitle
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                {hoveredElement.name}
              </DetailTitle>
              <DetailInfo>
                {[
                  { label: "Atomic Number", value: hoveredElement.atomicNumber },
                  { label: "Symbol", value: hoveredElement.symbol },
                  { label: "Atomic Mass", value: hoveredElement.atomicMass },
                  { label: "Category", value: hoveredElement.category },
                  { label: "Group", value: hoveredElement.group },
                  { label: "Period", value: hoveredElement.period },
                  { label: "Block", value: hoveredElement.block }
                ].map((item, index) => (
                  <DetailText
                    key={item.label}
                    custom={index}
                    variants={detailTextVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span>{item.label}:</span>
                    <span>{item.value}</span>
                  </DetailText>
                ))}
              </DetailInfo>
            </DetailCard>
          </>
        )}
      </AnimatePresence>
    </TableContainer>
  );
};

export default PeriodicTable; 