import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './style.module.scss';
import { blur, translate } from '../../anim';
import { Link as LinkType } from '@/types/link';

interface SelectedLink {
  isActive: boolean;
  index: number;
}

interface BodyProps {
  links: LinkType[];
  selectedLink: SelectedLink;
  setSelectedLink: (selectedLink: SelectedLink) => void;
  setIsActive: (isActive: boolean) => void;
}

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive
}: BodyProps) {
  const getChars = (word: string) => {
    let chars: JSX.Element[] = [];
    word.split('').forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div className={styles.body}>
      {links.map((link, index) => {
        const { title, href, target } = link;

        return (
          <Link key={`l_${index}`} href={href} target={target}>
            <motion.p
              onClick={() => setIsActive(false)}
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? 'open'
                  : 'closed'
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
