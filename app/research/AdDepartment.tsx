"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { adDepartmentData, type AdPiece } from "./ad-department-data";
import styles from "./research.module.css";

const { groups, pieces, total, wideTile, gameUrl } = adDepartmentData;
const piecesById = new Map<string, AdPiece>(pieces.map((piece) => [piece.id, piece]));
const groupLabels = new Map(groups.map((group) => [group.id, group.label]));
const number = (value: number) => String(value).padStart(2, "0");

function PieceLink({ piece, children, className, onClick }: {
  piece: AdPiece;
  children: ReactNode;
  className: string;
  onClick?: () => void;
}) {
  const href = piece.id === "game" && !gameUrl ? "/writing/agency-era" : piece.href;
  if (href.startsWith("/writing/") || href === "/thesis-tracker") {
    return <Link className={className} href={href} onClick={onClick}>{children}</Link>;
  }
  return <a className={className} href={href} onClick={onClick}>{children}</a>;
}

export default function AdDepartment() {
  const [activeGroup, setActiveGroup] = useState<(typeof groups)[number]["id"]>(groups[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const selectedPiece = openIndex === null ? null : pieces[openIndex];

  useEffect(() => {
    if (openIndex === null) return;
    const nextPiece = pieces[(openIndex + 1) % pieces.length];
    const preload = new window.Image();
    preload.src = nextPiece.src;
  }, [openIndex]);

  function openPiece(index: number, opener: HTMLElement) {
    openerRef.current = opener;
    setOpenIndex(index);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function movePiece(direction: number) {
    setOpenIndex((current) => current === null ? null : (current + direction + pieces.length) % pieces.length);
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % groups.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + groups.length) % groups.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = groups.length - 1;
    else return;
    event.preventDefault();
    setActiveGroup(groups[next].id);
    document.getElementById(`ad-tab-${groups[next].id}`)?.focus();
  }

  function onDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      movePiece(event.key === "ArrowRight" ? 1 : -1);
    }
  }

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current || event.target === dialogRef.current?.firstElementChild) closeDialog();
  }

  return <section id="ad-department" className={styles.adDept} aria-labelledby="ad-department-title">
    <div className={styles.wrap}>
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}>Format experiments</p><h2 id="ad-department-title">The Ad Department</h2></div>
        <p className={styles.sectionIntro}>Thirty-four ads for things that are free to read. Print pages, magazine inserts, movie posters and a few objects, each built to sell <em>one argument</em> from this site.</p>
      </div>

      <div className={`${styles.seriesContext} ${styles.adDeptContext}`}>
        <div><p className={styles.contextLabel}>House rules</p><h3>Real thesis. Borrowed formats. Original art.</h3></div>
        <p>Classic print campaigns could carry an idea with one headline and one picture. These pieces borrow that discipline and point it at the essays, trackers and editions published here.</p>
      </div>

      <div className={styles.adDeptTabs} role="tablist" aria-label="Ad formats">
        {groups.map((group, index) => <button key={group.id} id={`ad-tab-${group.id}`} type="button" role="tab" aria-selected={activeGroup === group.id} aria-controls={`ad-panel-${group.id}`} tabIndex={activeGroup === group.id ? 0 : -1} onClick={() => setActiveGroup(group.id)} onKeyDown={(event) => onTabKeyDown(event, index)}>{group.label} <span>{number(group.count)}</span></button>)}
      </div>

      {groups.map((group) => {
        const groupPieces = pieces.filter((piece) => piece.group === group.id);
        return <div key={group.id} id={`ad-panel-${group.id}`} className={styles.adDeptPanel} role="tabpanel" aria-labelledby={`ad-tab-${group.id}`} hidden={activeGroup !== group.id} tabIndex={0}>
          <p className={styles.adDeptPanelNote}>{group.panelNote}. Showing {group.featured.length} of {group.count}.</p>
          <div className={`${styles.issueGrid} ${styles.adDeptGrid} ${group.id === "mag" ? styles.adDeptGridMag : ""} ${group.id === "object" ? styles.adDeptGridObject : ""}`}>
            {group.featured.map((id) => {
              const piece = piecesById.get(id);
              if (!piece) return null;
              const position = groupPieces.findIndex((item) => item.id === id) + 1;
              return <article className={`${styles.issue} ${styles.adTile} ${id === wideTile ? styles.adTileWide : ""}`} key={id}>
                <button type="button" className={`${styles.coverLink} ${styles.adTileFrame}`} aria-label={`Enlarge ${piece.title}`} onClick={(event) => openPiece(piece.order - 1, event.currentTarget)}>
                  <Image src={piece.src} alt={piece.alt} width={piece.width} height={piece.height} sizes="(max-width: 700px) 76vw, (max-width: 1050px) 50vw, 25vw" />
                  <span className={styles.adTileZoom}>Enlarge</span>
                </button>
                <div className={styles.issueCopy}>
                  <p className={styles.issueMeta}><span>{piece.format}</span><span>{number(position)} / {number(group.count)}</span></p>
                  <h3>{piece.title}</h3>
                  <p className={`${styles.issueDescription} ${styles.adTileNote}`}>{piece.note}</p>
                  <PieceLink piece={piece} className={styles.readLink}>{piece.linkLabel}</PieceLink>
                </div>
              </article>;
            })}
          </div>
        </div>;
      })}

      {gameUrl && (() => {
        const gamePiece = piecesById.get("game");
        if (!gamePiece) return null;
        return <div className={styles.adDeptPlaying}>
          <button className={styles.adDeptPlayingArt} type="button" aria-label="Enlarge Agency Era game box art" onClick={(event) => openPiece(gamePiece.order - 1, event.currentTarget)}><Image src={gamePiece.src} alt="" width={gamePiece.width} height={gamePiece.height} sizes="84px" /></button>
          <div className={styles.adDeptPlayingCopy}><p className={styles.adDeptPlayingLabel}>Now playing</p><h3>The ad was for a game that did not exist. So the game got built.</h3><p>Agency Era started as box art for a made-up strategy title. It is now a one-page browser game about energy, compute, agents and judgment.</p></div>
          <a className={styles.adDeptPlayBtn} href={gameUrl}>Play Agency Era</a>
        </div>;
      })()}

      <div className={styles.editorialNote}>
        <span className={styles.noteLabel}>Production note</span>
        <p>Every piece was generated with AI and then edited. That meant rerolling for original art, rewriting lines that read like a machine wrote them, and checking that each ad points at a page you can open.</p>
        <button type="button" className={styles.adDeptAll} onClick={(event) => openPiece(0, event.currentTarget)}>See all {total} pieces</button>
      </div>
    </div>

    <dialog ref={dialogRef} className={styles.adBox} aria-label="Ad Department enlarged view" onKeyDown={onDialogKeyDown} onClick={onDialogClick} onClose={() => { setOpenIndex(null); openerRef.current?.focus({ preventScroll: true }); }}>
      {selectedPiece && <div className={styles.adBoxInner}>
        <div className={styles.adBoxStage}><Image src={selectedPiece.src} alt={selectedPiece.alt} width={selectedPiece.width} height={selectedPiece.height} sizes="(max-width: 900px) 100vw, 70vw" /></div>
        <div className={styles.adBoxSide}>
          <p className={styles.adBoxCount}>{number(openIndex! + 1)} / {number(total)}</p>
          <p className={styles.adBoxMeta}>{groupLabels.get(selectedPiece.group)} · {selectedPiece.format} · Sells: {selectedPiece.sells}</p>
          <h3>{selectedPiece.title}</h3>
          <p className={styles.adBoxNote}>{selectedPiece.note}</p>
          <PieceLink piece={selectedPiece} className={styles.readLink} onClick={selectedPiece.href === "#editions-title" ? closeDialog : undefined}>{selectedPiece.linkLabel}</PieceLink>
          <div className={styles.adBoxNav}><button type="button" onClick={() => movePiece(-1)}>Previous</button><button type="button" onClick={() => movePiece(1)}>Next</button></div>
        </div>
        <button type="button" className={styles.adBoxClose} onClick={closeDialog}>Close</button>
      </div>}
    </dialog>
  </section>;
}
