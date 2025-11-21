// Relationships — Tooltip Copy (short, lore-friendly)
var REL_TIPS = {
    presets: {
        ally: "Warm alignment. Mutual support is expected.",
        mentor: "Guidance role. High respect; influence from experience.",
        rival: "Competitive tension. Respect may be high; trust often low.",
        family: "Deep bond. High trust/affinity; rivalry minimal unless strained.",
        enemy: "Active opposition. Hostility dominates; trust is rare.",
        lover: "Romantic/infatuated. High affinity; trust varies.",
        stranger: "Limited history. Neutral baseline until proven otherwise.",
        custom: "Define your own relational stance and tune the sliders."
    },
    sliders: {
        trust: "Confidence in reliability. Can they be counted on?",
        affinity: "Warmth and fondness toward the target.",
        respect: "Esteem for capability or wisdom.",
        rivalry: "Competitive friction or antagonism.",
        influence: "How much the target sways feelings/choices."
    },
    ui: {
        target: "Pick who the active actor is evaluating.",
        typeSelect: "Choose a relationship archetype or apply a preset.",
        addUpdate: "Add a new entry or append another view of the same person.",
        reciprocal: "Also create a mirrored entry from the target back to the active actor.",
        clearEdge: "Remove all A→B entries for the selected target.",
        compact: "Tighten spacing for faster editing.",
        ledger: "All A→* entries. Click a row to load; ✕ deletes that entry."
    },
    graph: {
        legend: "Compass: center is the active actor. Closer = stronger. Color = valence (green ally ↔ red rival). Line width = strength. Node size = influence."
    }
};
