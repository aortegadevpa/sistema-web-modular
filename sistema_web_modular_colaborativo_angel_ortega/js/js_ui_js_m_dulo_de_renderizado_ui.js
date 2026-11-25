/* =========================================================
   MÓDULO DE INTERFAZ: js/ui.js
   Responsable del renderizado del DOM, tarjetas y notificaciones
   ========================================================= */

const UIModule = (() => {
    let toastTimer = null;

    function showToast(title, msg) {
        const toast = document.getElementById('toast');
        document.getElementById('toast-title').textContent = title;
        document.getElementById('toast-msg').textContent = msg;
        toast.classList.remove('translate-y-24', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-24', 'opacity-0');
        }, 3000);
    }

    function toggleArchModal() {
        const modal = document.getElementById('arch-modal');
        modal.classList.toggle('hidden');
        modal.classList.toggle('flex');
    }

    function updateFilterButtons(activeFilter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.getAttribute('data-filter') === activeFilter) {
                btn.className = 'filter-btn px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40';
            } else {
                btn.className = 'filter-btn px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 text-slate-400 border border-slate-800 hover:text-white';
            }
        });
    }

    function createCardHTML(task) {
        const moduleColors = {
            'UI / CSS Modular': 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
            'Core JS / Estado': 'text-amber-300 bg-amber-500/10 border-amber-500/30',
            'API & Datos': 'text-purple-300 bg-purple-500/10 border-purple-500/30',
            'Git / QA Review': 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
        };
        const badgeStyle = moduleColors[task.module] || 'text-slate-300 bg-slate-800 border-slate-700';

        return `
        <article class="task-card rounded-xl p-4 space-y-3">
            <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-mono px-2 py-0.5 rounded border ${badgeStyle}">${task.module}</span>
                <span class="text-[11px] font-mono text-slate-500">${task.id}</span>
            </div>

            <h4 class="text-sm font-semibold text-white leading-snug">${task.title}</h4>

            <div class="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-950/70 px-2.5 py-1.5 rounded-lg border border-slate-800/80">
                <i class="fa-solid fa-code-branch text-cyan-400"></i>
                <span class="truncate">${task.branch}</span>
            </div>

            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span class="text-[11px] text-slate-400"><i class="fa-regular fa-user mr-1"></i>${task.author}</span>
                <div class="flex items-center gap-1.5">
                    ${task.status !== 'todo' ? `
                    <button type="button" onclick="StoreModule.moveTask('${task.id}', -1)" class="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-700" title="Mover atrás">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>` : ''}
                    ${task.status !== 'done' ? `
                    <button type="button" onclick="StoreModule.moveTask('${task.id}', 1)" class="p-1.5 rounded-lg bg-slate-900 hover:bg-cyan-500/20 text-cyan-300 text-xs border border-slate-700" title="Avanzar etapa">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>` : ''}
                    <button type="button" onclick="StoreModule.removeTask('${task.id}')" class="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 text-xs border border-slate-800" title="Eliminar">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </article>`;
    }

    function renderBoard(allTasks, activeFilter) {
        const filtered = activeFilter === 'ALL' ? allTasks : allTasks.filter(t => t.module === activeFilter);

        const todoTasks = filtered.filter(t => t.status === 'todo');
        const doingTasks = filtered.filter(t => t.status === 'doing');
        const doneTasks = filtered.filter(t => t.status === 'done');

        document.getElementById('col-todo').innerHTML = todoTasks.length ? todoTasks.map(createCardHTML).join('') : `<p class="text-xs text-slate-500 text-center py-8">Sin tareas pendientes</p>`;
        document.getElementById('col-doing').innerHTML = doingTasks.length ? doingTasks.map(createCardHTML).join('') : `<p class="text-xs text-slate-500 text-center py-8">Sin tareas en curso</p>`;
        document.getElementById('col-done').innerHTML = doneTasks.length ? doneTasks.map(createCardHTML).join('') : `<p class="text-xs text-slate-500 text-center py-8">Sin merges recientes</p>`;

        document.getElementById('count-todo').textContent = todoTasks.length;
        document.getElementById('count-doing').textContent = doingTasks.length;
        document.getElementById('count-done').textContent = doneTasks.length;

        const totalAll = allTasks.length;
        const doingAll = allTasks.filter(t => t.status === 'doing').length;
        const doneAll = allTasks.filter(t => t.status === 'done').length;
        const pct = totalAll > 0 ? Math.round((doneAll / totalAll) * 100) : 0;

        document.getElementById('stat-total').textContent = totalAll;
        document.getElementById('stat-doing').textContent = doingAll;
        document.getElementById('stat-progress').textContent = `${pct}%`;
    }

    return {
        showToast,
        toggleArchModal,
        updateFilterButtons,
        renderBoard
    };
})();