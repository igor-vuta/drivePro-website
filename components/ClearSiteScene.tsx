'use client';

import styles from './ClearSiteController.module.css';

const soil = [
  { number: 1, x: 386, y: 213 },
  { number: 2, x: 469, y: 224 },
  { number: 3, x: 548, y: 213 },
];

export default function ClearSiteScene({ cleared }: { cleared: number }) {
  return (
    <svg className={styles.scene} viewBox="0 0 900 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="900" height="300" fill="#1A1A1A" />
      <path d="M0 226 448 132 900 224 900 300H0Z" fill="#29251e" />
      <path d="M215 245 447 173 650 245" fill="none" stroke="#D4A017" strokeWidth="2" opacity=".7" />
      <path d="M250 269 446 206 658 269" fill="none" stroke="#D4A017" strokeWidth="2" opacity=".5" />

      {/* A compact, original excavator silhouette stays behind the site. */}
      <g fill="none" stroke="#D4A017" strokeWidth="12" strokeLinejoin="round" strokeLinecap="square">
        <path d="M302 155 329 112 380 124 391 167" />
        <path d="M380 124 414 163 402 185" />
      </g>
      <path d="M288 172h100l17 24H276Z" fill="#C0392B" />
      <path d="M314 144h43l15 27h-71Z" fill="#D4A017" />
      <path d="M326 149h25l10 19h-45Z" fill="#1A1A1A" />
      <rect x="285" y="195" width="108" height="21" rx="9" fill="#0A0A0A" stroke="#D4A017" strokeWidth="3" />
      <circle cx="310" cy="205" r="5" fill="#D4A017" />
      <circle cx="368" cy="205" r="5" fill="#D4A017" />

      {/* Each cleared bit reveals a part of the same illustrative moped. */}
      {(cleared & 1) !== 0 && (
        <g fill="none" stroke="#F5F0E8" strokeWidth="6">
          <circle cx="439" cy="211" r="23" />
          <circle cx="546" cy="211" r="23" />
          <path d="M439 211 476 176 509 209 546 211" />
        </g>
      )}
      {(cleared & 2) !== 0 && (
        <g>
          <path d="M467 174h56l21 24-39 12-41-16Z" fill="#C0392B" />
          <path d="M463 170h42" stroke="#0A0A0A" strokeWidth="8" strokeLinecap="round" />
          <path d="M499 175 484 195" stroke="#D4A017" strokeWidth="5" />
        </g>
      )}
      {(cleared & 4) !== 0 && (
        <g fill="none" stroke="#F5F0E8" strokeWidth="5" strokeLinecap="round">
          <path d="M531 197 525 153 541 147" />
          <path d="M515 151h30" />
          <path d="M544 198h18" stroke="#D4A017" />
        </g>
      )}

      <rect x="560" y="184" width="90" height="72" fill="none" stroke="#D4A017" strokeWidth="2" strokeDasharray="7 6" />
      {soil.map(({ number, x, y }) => (
        (cleared & (1 << (number - 1))) !== 0 ? (
          <g key={number}>
            <path d={`M${570 + (number - 1) * 20} ${239 - (number - 1) * 7}q14-25 28 0Z`} fill="#A66C29" stroke="#D4A017" strokeWidth="2" />
          </g>
        ) : (
          <g key={number}>
            <path d={`M${x - 32} ${y + 23}q12-49 33-48 19 0 32 48Z`} fill="#A66C29" stroke="#D4A017" strokeWidth="2" />
            <path d={`M${x - 22} ${y + 11}q12-27 22-26`} fill="none" stroke="#C89143" strokeWidth="3" />
            <circle cx={x} cy={y + 5} r="13" fill="#1A1A1A" stroke="#F5F0E8" strokeWidth="2" />
            <text x={x} y={y + 11} textAnchor="middle" fill="#F5F0E8" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="700">{number}</text>
          </g>
        )
      ))}
    </svg>
  );
}
