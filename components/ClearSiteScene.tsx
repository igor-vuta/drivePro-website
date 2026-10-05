'use client';

import type { CSSProperties } from 'react';
import styles from './ClearSiteController.module.css';

function Box({ x = 0, y = 0, z = 0, w, h, d, color = 'gold', rotate = 0 }: { x?: number; y?: number; z?: number; w: number; h: number; d: number; color?: string; rotate?: number }) {
  return <div className={`${styles.box} ${styles[color]}`} style={{ '--w': `${w}px`, '--h': `${h}px`, '--d': `${d}px`, transform: `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${rotate}deg)` } as CSSProperties}>
    {['front', 'back', 'right', 'left', 'top', 'bottom'].map(face => <span key={face} className={styles[face]} />)}
  </div>;
}

export default function ClearSiteScene({ cleared, rotation, action, paused }: { cleared: number; rotation: number; action: number; paused: boolean }) {
  return <div className={`${styles.scene} ${paused ? styles.paused : ''}`} aria-hidden="true" data-scene="3d">
    <div className={styles.camera} style={{ '--rotation': `${rotation}deg` } as CSSProperties}>
      <div className={styles.world}>
        <Box w={660} h={22} d={270} y={45} color="platform" />
        <Box w={200} h={40} d={30} x={-150} y={12} z={-48} color="track" />
        <Box w={200} h={40} d={30} x={-150} y={12} z={48} color="track" />
        <Box w={165} h={35} d={100} x={-150} y={-22} />
        <Box w={68} h={68} d={62} x={-102} y={-73} />
        <Box w={55} h={50} d={65} x={-100} y={-78} color="glass" />
        <Box w={65} h={43} d={98} x={-210} y={-45} color="red" />
        <div key={action} className={`${styles.boom} ${action ? styles.dig : ''}`}>
          <Box w={142} h={24} d={28} x={67} y={0} />
          <Box w={95} h={6} d={9} x={62} y={-23} color="steel" />
          <div className={styles.forearm}>
            <Box w={132} h={21} d={24} x={63} />
            <Box w={85} h={6} d={8} x={48} y={-22} color="steel" />
            <Box w={45} h={53} d={48} x={139} y={15} color="bucket" rotate={-20} />
          </div>
        </div>
        {[1, 2, 3].map((n) => <div key={n} className={`${styles.pileModel} ${cleared & (1 << (n - 1)) ? styles.cleared : ''}`} style={{ transform: `translate3d(${40 + n * 77}px, 15px, 45px)` }}>
          <Box w={74} h={20} d={82} color="soil" />
          <Box w={54} h={25} d={60} y={-17} color="soil" rotate={17 * n} />
          <Box w={30} h={23} d={35} y={-38} color="soil" rotate={-20} />
          <span className={styles.pileNumber}>{n}</span>
        </div>)}
        {cleared === 7 && <div className={styles.moped}>
          <Box w={60} h={26} d={25} x={210} y={-7} z={60} color="red" />
          <Box w={32} h={8} d={28} x={196} y={-25} z={60} color="track" />
          <Box w={8} h={48} d={10} x={245} y={-24} z={60} color="steel" rotate={-12} />
          <Box w={25} h={6} d={12} x={248} y={-48} z={60} color="steel" />
          <span className={styles.wheel} style={{ left: '180px' }} /><span className={styles.wheel} style={{ left: '240px' }} />
        </div>}
      </div>
    </div>
  </div>;
}
