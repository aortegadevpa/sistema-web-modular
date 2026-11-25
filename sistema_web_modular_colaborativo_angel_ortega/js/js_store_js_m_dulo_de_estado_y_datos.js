/* =========================================================
   MÓDULO DE ESTADO Y PERSISTENCIA: js/store.js
   Responsable del manejo de datos, filtros y LocalStorage
   ========================================================= */

const StoreModule = (() => {
    const STORAGE_KEY = 'ao_modular_kanban_v1';
    let activeFilter = 'ALL';
    let tasks = [];

    const initialTasks = [
        {
            id: 'MOD-01',
            title: 'Sistema de diseño con variables CSS en css/styles.css',
            module: 'UI / CSS Modular',
            branch: 'feat/ui-grid-tokens',
            author: 'Angel O.',
            status: 'done'
        },
        {
            id: 'MOD-02',
            title: 'Controlador de estado desacoplado en js/store.js',
            module: 'Core JS / Estado',
            branch: 'feat/state-store',
            author: 'Angel O.',
            status: 'done'
        },
        {
            id: 'MOD-03',
            title: 'Renderizado de componentes UI en js/ui.js',
            module: 'Core JS / Estado',
            branch: 'feat/ui-renderer',
            author: 'Equipo Dev',
            status: 'doing'
        },
        {
            id: 'MOD-04',
            title: 'Validación de Pull Requests y pruebas en móviles',
            module: 'Git / QA Review',
            branch: 'qa/responsive-check',
            author: 'Angel O.',
            status: 'todo'
        },
        {
            id: 'MOD-05',
            title: 'Conector opcional REST para sincronización remota',
            module: 'API & Datos',
            branch: 'feat/api-adapter',
            author: 'Equipo Dev',
            status: 'todo'
        }
    ];

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    function init() {
        const saved = localStorage.getItem(STORAGE_KEY);
        tasks = saved ? JSON.parse(saved) : [...initialTasks];
        save();
        UIModule.renderBoard(tasks, activeFilter);
    }

    function addTask(title, module, branch) {
        const nextId = `MOD-0${tasks.length + 1}`;
        tasks.unshift({
            id: nextId,
            title,
            module,
            branch: branch || 'feat/nuevo-modulo',
            author: 'Angel O.',
            status: 'todo'
        });
        save();
        UIModule.renderBoard(tasks, activeFilter);
        UIModule.showToast('Módulo Agregado', `Tarea ${nextId} creada en el Backlog.`);
    }

    function moveTask(id, direction) {
        const order = ['todo', 'doing', 'done'];
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        const nextIdx = order.indexOf(task.status) + direction;
        if (nextIdx >= 0 && nextIdx < order.length) {
            task.status = order[nextIdx];
            save();
            UIModule.renderBoard(tasks, activeFilter);
            const labels = { todo: 'Backlog', doing: 'En Desarrollo', done: 'Merged / Listo' };
            UIModule.showToast('Estado Actualizado', `${task.id} movido a "${labels[task.status]}".`);
        }
    }

    function removeTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        save();
        UIModule.renderBoard(tasks, activeFilter);
        UIModule.showToast('Tarea Eliminada', `Se removió ${id} del tablero.`);
    }

    function setFilter(filter) {
        activeFilter = filter;
        UIModule.updateFilterButtons(activeFilter);
        UIModule.renderBoard(tasks, activeFilter);
    }

    function resetDemo() {
        tasks = [...initialTasks];
        activeFilter = 'ALL';
        save();
        UIModule.updateFilterButtons(activeFilter);
        UIModule.renderBoard(tasks, activeFilter);
        UIModule.showToast('Tablero Restaurado', 'Se cargaron los módulos colaborativos de ejemplo.');
    }

    return {
        init,
        addTask,
        moveTask,
        removeTask,
        setFilter,
        resetDemo
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    StoreModule.init();

    const form = document.getElementById('new-task-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('task-title').value.trim();
            const module = document.getElementById('task-module').value;
            const branch = document.getElementById('task-branch').value.trim();
            if (!title) return;
            StoreModule.addTask(title, module, branch);
            e.target.reset();
        });
    }
});