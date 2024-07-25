import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './style.module.scss';
import { opacity } from '../../anim';

interface IndexProps {
  src: string;
  isActive: boolean;
}

const Index: React.FC<IndexProps> = ({ src, isActive }) => {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? 'open' : 'closed'}
      className={styles.imageContainer}
    >
      <Image
        src={`/images/nav/${src}`}
        fill={true}
        alt={'Image'}
        // priority={true}
      />
    </motion.div>
  );
};

export default Index;
