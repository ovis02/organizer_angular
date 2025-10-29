export interface Task {
    id: string;        // identifiant unique (ex: Date.now().toString())
    title: string;     // titre de la tâche
    done: boolean;     // terminée ou non
    due?: string;      // (optionnel) date limite au format ISO (YYYY-MM-DD)
    notes?: string;    // (optionnel) description ou note
}
