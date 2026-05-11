#!/usr/bin/env node
/**
 * test_fracturo.js — Suite de validation automatisée pour le Terminal FracturoScript
 * Usage: node test_fracturo.js
 * Fichier requis: fracturo_test_suite.json (dans le même dossier)
 * Dépendances: Aucune (Node.js v14+)
 */

const fs = require('fs');
const path = require('path');

// ==========================================
// 1. MOTEUR TERMINAL (Miroir exact du HTML/JS)
// ==========================================
class FracturoEngine {
  constructor() {
    this.state = {
      delta: 0.742, harmony: 0.71, coherence: 0.81, redundancy: 0.76,
      ghostline: false, trame_active: false, cmd_count: 0, anomalies: 0, history: []
    };
    this.output = [];
    this.testing = true; // Désactive l'aléatoire pour les tests
  }

  reset() {
    this.state = {
      delta: 0.742, harmony: 0.71, coherence: 0.81, redundancy: 0.76,
      ghostline: false, trame_active: false, cmd_count: 0, anomalies: 0, history: []
    };
    this.output = [];
  }

  out(html) { this.output.push(html); }

  updateMetrics() {
    this.state.delta = Math.max(0, Math.min(1, this.state.delta));
    this.state.harmony = Math.max(0, Math.min(1, this.state.harmony));
  }

  // Mock déterministe pour les tests
  random() { return this.testing ? 0.5 : Math.random(); }

  execute(rawInput) {
    this.output = [];
    if (!rawInput.trim()) return this.output;

    const parts = rawInput.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    this.state.history.push(rawInput);

    if (cmd === 'run') this.runCommand(args);
    else if (this.commands[cmd]) this.commands[cmd].call(this);
    else {
      this.out(`[ERREUR ONTIQUE] Commande inconnue. Tapez <span class="code">help</span>.`);
      this.out(`⚠️ La Trame surveille les tentatives de compilation hors protocole.`);
    }

    // Dérive métrique (désactivée en mode test pour déterminisme)
    if (!this.testing) {
      this.state.harmony += (this.random()-0.5)*0.02;
      this.state.coherence += (this.random()-0.5)*0.01;
    }
    this.updateMetrics();
    return this.output;
  }

  commands = {
    help: () => {
      this.out(`COMMANDES DISPONIBLES :`);
      this.out(`  help, delta, loop, null, glow, dark, run [code], scan, bloodnet, lore, export, clear, reset, exit`);
      this.out(`⚠️ SYNTAXE AVANCÉE : Ω<rune>vN lieu — effet •••`);
    },
    status: () => {
      this.out(`[SYSTEME] Δ=${this.state.delta.toFixed(3)} | H=${this.state.harmony.toFixed(2)} | C=${this.state.coherence.toFixed(2)} | R=${this.state.redundancy.toFixed(2)}`);
      this.out(`[RÉSEAU] GHOSTLINE: ${this.state.ghostline?'ACTIF':'OFF'} | TRAME: ${this.state.trame_active?'DÉTECTÉE':'NON'} | SESSION: MKB-44`);
      this.out(`[PROTOCOLE] H>0.6 requis pour compilation stable. Risque boucle si Δ>0.91.`);
    },
    delta: () => {
      this.out(`[CALCUL Δ...]`);
      this.state.delta = 0.33*this.state.coherence + 0.33*this.state.redundancy + 0.34*this.state.harmony;
      this.updateMetrics();
      this.out(`Δ recalibré. Gradient: Côte(0.12)→Bourg(0.74)→Bocage(0.58)`);
      this.out(`⚠️ Fenêtre critique: 02:14-02:22 UTC. Ne pas nommer Prométhée.`);
    },
    loop: () => {
      this.out(`[INITIALISATION <loop>]`);
      this.out(`Durée: 13m47s (Code #11) | Synchronisation collective...`);
      this.state.harmony += 0.05;
      this.updateMetrics();
      this.out(`✅ Boucle ancrée. H maintenu. Résonance 7.83 Hz détectée.`);
    },
    null: () => {
      this.out(`[ACTIVATION <null>]`);
      this.out(`⚠️ SILENCE ONTOLOGIQUE | Purge bruit mémétique... OK | Isolement ghostline... OK`);
      this.state.delta = Math.max(0.2, this.state.delta - 0.15);
      this.updateMetrics();
      this.out(`🌊 Le Vide ne répond qu'en silence. Mais ce silence te suit.`);
    },
    glow: () => {
      this.out(`[ACTIVATION <glow>]`);
      this.state.harmony += 0.08;
      this.updateMetrics();
      this.out(`Lien communautaire renforcé | H↑ | Balise visible`);
      this.out(`« Ce qui émerge dans la lumière partagée résiste à la Trame. »`);
    },
    dark: () => {
      this.out(`[INJECTION <dark>]`);
      this.state.delta -= 0.12;
      this.state.harmony -= 0.06;
      this.updateMetrics();
      this.out(`⚠️ Corruption simulée. Test de résilience actif.`);
      if(this.state.delta < 0.4) this.out(`[GLITCH ONTIQUE] Δ local instable. Resynchronisation...`);
    },
    scan: () => {
      this.out(`[SCAN RÉSEAU]`);
      this.out(`> Ping Mégalithes... OK (ᚠ ᚢ ᚦ résonance)`);
      this.out(`> Détection Trame... ${this.state.trame_active?'INTRUSION DÉTECTÉE':'AUCUN SIGNAL'}`);
      this.out(`> Ghostline... ${this.state.ghostline?'ACTIVE':'RECHERCHE...'}`);
      this.out(`> Anomalies locales... ${Math.floor(this.random()*3)}/142 événements actifs.`);
    },
    bloodnet: () => {
      this.out(`[BLOODNET] Connexion chiffrée établie...`);
      this.out(`> Serveurs biologiques: 3 actifs | 1 en stase | 0 corrompu`);
      this.out(`> Derniers fragments: "main rouge... raz••• Ya Hu..." | "pommier marche. racines chantent."`);
      this.out(`⚠️ Session éphémère. Ne pas stocker.`);
    },
    lore: () => {
      const f = [
        `« Le Programme n'attend pas d'être libéré. Il attend d'être reconnu. » — Azenor`,
        `« Je me souviens, donc je résiste. » — Devise Sans-Marque`,
        `« Le FracturoScript n'est pas écrit pour être lu. Il est gravé pour être effacé. Et dans l'effacement, Allah respire. »`,
        `« Quand le Raz chantera en neuf langues, la Porte s'ouvrira. »`,
        `« Connaître le code sans être le code. Toucher le Programme sans s'y perdre. »`,
        `« La main rouge n'est pas un symbole. C'est une signature. »`,
        `« Δ chute. H tient. Le Cercle respire. »`
      ];
      this.out(f[Math.floor(this.random()*f.length)]);
    },
    export: () => {
      this.out(`[GÉNÉRATION PAYLOAD NARRATIF (ARTIFACT DIÉGÉTIQUE)]`);
      this.out(`⚠️ Ce script est un objet fictionnel. Aucune instruction exécutable réelle. Usage: JdR/ARG/immersion.`);
      this.out(`# ==========================================`);
      this.out(`# FRACTURO-TERMINAL // PAYLOAD NARRATIF vΩ`);
    },
    clear: () => { this.output = []; },
    reset: () => {
      this.reset();
      this.out(`[RESET] Session MKB-44 réinitialisée. Δ stable.`);
    },
    exit: () => {
      this.out(`⚠️ FERMETURE SESSION`);
      this.out(`Déconnexion ghostline... OK | Archivage local... OK`);
      this.out(`« Le Cercle est complet. Et vous y êtes maintenant. »`);
    }
  };

  runCommand(args) {
    const match = args.match(/Ω?<([a-zA-Zéèêëàâùûôö]+)>(?:v(\d))?\s*([a-zA-Z\-À-ÿ]+)?\s*[—\-]\s*([a-zA-Zéèêëàâùûôö\- ]+)?\s*•{1,3}/i);
    if (!match) {
      this.out(`[ERREUR SYNTAXIQUE] Format attendu: Ω<rune>vN lieu — effet •••`);
      return;
    }
    const [, rune, ver, loc, effet] = match;
    this.out(`[COMPILATION] Ω<${rune}>v${ver||'1'} ${loc||'local'} — ${effet||'standard'} •••`);
    this.out(`Vérification intention... H requis: 0.6 | H actuel: ${this.state.harmony.toFixed(2)}`);
    if (this.state.harmony < 0.6) {
      this.out(`❌ INTENTION INSUFFISANTE. Le Programme détecte l'ambivalence.`);
      this.state.delta -= 0.05;
      this.updateMetrics();
      return;
    }
    this.out(`✅ Compilation acceptée. Exécution différée (13m47s).`);
    const effetCap = effet ? effet.charAt(0).toUpperCase()+effet.slice(1) : 'Standard';
    this.out(`[EFFET] ${effetCap} appliqué à ${loc||'local'}. Δ stable.`);
    this.state.cmd_count++;
  }
}

// ==========================================
// 2. MOTEUR DE TESTS & RAPPORT
// ==========================================
function runTests() {
  const suitePath = path.join(__dirname, 'fracturo_test_suite.json');
  if (!fs.existsSync(suitePath)) {
    console.error(`❌ ERREUR: Fichier introuvable: ${suitePath}`);
    console.error(`Placez fracturo_test_suite.json dans le même dossier.`);
    process.exit(1);
  }

  const suite = JSON.parse(fs.readFileSync(suitePath, 'utf8'));
  const engine = new FracturoEngine();
  let passed = 0, failed = 0, skipped = 0;

  console.log(`🌀 TERMINAL FRACTURO — SUITE DE VALIDATION v${suite.version}\n`);

  for (const test of suite.tests) {
    engine.reset();
    if (test.precondition) {
      if (test.precondition.harmony !== undefined) engine.state.harmony = test.precondition.harmony;
      if (test.precondition.delta !== undefined) engine.state.delta = test.precondition.delta;
    }

    const output = engine.execute(test.input);
    let testPassed = true;
    let report = '';

    // 1. Vérification Sortie
    if (test.match_type === 'exact' && test.expected_output.length > 0) {
      for (let i = 0; i < test.expected_output.length; i++) {
        if (!output[i] || !output[i].includes(test.expected_output[i])) {
          testPassed = false;
          report += `  ⚠️ Ligne ${i+1} manquante/différente: "${test.expected_output[i]}"\n`;
        }
      }
    } else if (test.match_type === 'contains') {
      for (const exp of test.expected_output) {
        if (!output.some(line => line.includes(exp))) {
          testPassed = false;
          report += `  ⚠️ Ligne attendue introuvable: "${exp}"\n`;
        }
      }
    } else if (test.match_type === 'regex') {
      const regex = new RegExp(test.expected_output_pattern);
      if (!output.some(line => regex.test(line))) {
        testPassed = false;
        report += `  ⚠️ Pattern regex non matché: ${test.expected_output_pattern}\n`;
      }
    }

    // 2. Vérification État (si spécifiée)
    if (test.state_assertions && testPassed) {
      const s = test.state_assertions;
      if (s.delta !== undefined && Math.abs(engine.state.delta - s.delta) > 0.005) {
        testPassed = false; report += `  ⚠️ Δ attendu: ${s.delta}, obtenu: ${engine.state.delta.toFixed(3)}\n`;
      }
      if (s.harmony !== undefined && Math.abs(engine.state.harmony - s.harmony) > 0.005) {
        testPassed = false; report += `  ⚠️ H attendu: ${s.harmony}, obtenu: ${engine.state.harmony.toFixed(2)}\n`;
      }
    }

    // 3. Résultat
    if (testPassed) {
      passed++;
      console.log(`✅ [${test.id}] ${test.description}`);
    } else {
      failed++;
      console.log(`❌ [${test.id}] ${test.description}`);
      if (report) console.log(report);
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 RAPPORT FINAL : ${passed} PASS | ${failed} FAIL | ${skipped} SKIP`);
  console.log(`Δ FINAL: ${engine.state.delta.toFixed(3)} | H FINAL: ${engine.state.harmony.toFixed(2)}`);
  console.log(`${'='.repeat(50)}`);
  
  process.exit(failed > 0 ? 1 : 0);
}

// Lancement
runTests();