(() => {
    const state = {
        step: 0,
        answers: { stage: '', need: '', readiness: '' },
        result: null
    };

    const flows = {
        idea: {
            need: {
                title: '¿Qué quieres que pueda hacer tu idea primero?',
                help: 'Piensa en la primera utilidad, no en todo lo que podría tener en el futuro.',
                options: [
                    ['present','✨','Explicar una propuesta','Mostrar quién eres, qué haces o qué ofreces.'],
                    ['showcase','🗂️','Mostrar productos o trabajos','Ordenarlos visualmente para que se entiendan rápido.'],
                    ['capture','💬','Conseguir consultas','Que una persona entienda y pueda contactarte fácilmente.'],
                    ['system','⚙️','Resolver un proceso','Registrar, consultar, organizar o automatizar información.']
                ]
            },
            readiness: {
                title: '¿Qué tienes preparado hoy?',
                help: 'Esto cambia cuánto conviene construir en la primera versión.',
                options: [
                    ['blank','🌱','Solo la idea','Todavía no tengo textos, imágenes ni estructura.'],
                    ['material','📁','Ya tengo material','Tengo textos, imágenes, servicios o información.'],
                    ['prototype','🧩','Tengo algo probado','Ya hice una maqueta, formulario o versión inicial.']
                ]
            }
        },
        business: {
            need: {
                title: '¿Qué debería hacer una persona al encontrarte?',
                help: 'La respuesta define qué debe destacar la experiencia digital.',
                options: [
                    ['trust','🏷️','Entender y confiar','Conocer bien el negocio, servicios y experiencia.'],
                    ['browse','🛍️','Explorar lo que ofrezco','Ver productos, trabajos, precios referenciales o categorías.'],
                    ['contact','📨','Preguntar o cotizar','Llegar rápido a un formulario o canal de contacto.'],
                    ['manage','📊','Hacer una gestión','Reservar, registrar datos, consultar estados o administrar procesos.']
                ]
            },
            readiness: {
                title: '¿Cómo muestras hoy tu negocio?',
                help: 'No es lo mismo partir desde Instagram que desde una web ya organizada.',
                options: [
                    ['social','📱','Principalmente redes sociales','La información está repartida entre publicaciones y mensajes.'],
                    ['material','📁','Tengo contenido ordenado','Ya cuento con fotos, textos, catálogo o identidad visual.'],
                    ['tools','🧰','Uso varias herramientas','Tengo formularios, planillas o plataformas separadas.']
                ]
            }
        },
        site: {
            need: {
                title: '¿Qué es lo que más te molesta de tu web actual?',
                help: 'Elegir un problema concreto evita rehacer todo sin necesidad.',
                options: [
                    ['mobile','📱','En celular se ve mal','Se corta, desordena o resulta incómoda.'],
                    ['clarity','🧭','Cuesta entenderla','Hay demasiado texto, mala jerarquía o navegación confusa.'],
                    ['conversion','💬','No genera consultas','La gente entra, pero no avanza hacia una acción.'],
                    ['features','⚙️','Le faltan funciones','Necesito datos, formularios avanzados, roles o procesos.']
                ]
            },
            readiness: {
                title: '¿Cuánto quieres conservar?',
                help: 'Esto ayuda a decidir entre optimizar, rediseñar o evolucionar por etapas.',
                options: [
                    ['keep','🧱','Casi todo','La base sirve; quiero corregir puntos específicos.'],
                    ['partial','🔄','Solo algunas partes','Quiero mantener contenido, pero cambiar experiencia y estructura.'],
                    ['rethink','✨','Estoy abierta/o a replantearla','Prefiero revisar desde la estrategia y reconstruir lo necesario.']
                ]
            }
        },
        unsure: {
            need: {
                title: '¿Qué te gustaría dejar de depender tanto de hoy?',
                help: 'A veces es más fácil detectar la necesidad mirando el problema actual.',
                options: [
                    ['socialonly','📱','Solo de Instagram','Quiero un lugar propio donde ordenar mi información.'],
                    ['messages','💬','De explicar lo mismo por mensaje','Quiero responder dudas antes de que me escriban.'],
                    ['files','📄','De PDFs o archivos sueltos','Quiero que la información sea fácil de consultar.'],
                    ['manual','🧮','De tareas manuales','Repito registros, búsquedas o procesos que podrían simplificarse.']
                ]
            },
            readiness: {
                title: '¿Qué tan definido está lo que ofreces?',
                help: 'No necesitas tenerlo perfecto; solo saber cuánto hay que ordenar antes de construir.',
                options: [
                    ['fuzzy','🌫️','Todavía lo estoy ordenando','Incluso mi propuesta necesita más claridad.'],
                    ['clear','✅','Sé qué ofrezco','Me falta decidir cómo presentarlo digitalmente.'],
                    ['active','🚀','Ya lo hago en la práctica','Tengo clientes, usuarios o un proceso real que observar.']
                ]
            }
        }
    };

    const resultLibrary = {
        discovery: {
            title:'Mapa de solución + prototipo breve', icon:'🧭', service:'otro', level:'Exploración',
            reason:'Antes de construir mucho, te conviene ordenar la idea y probar una primera ruta visual.',
            priority:'Definir objetivo, público y una acción útil.',
            later:'Una web grande o automatizaciones sin validar primero.',
            why:'Cuando la propuesta todavía está tomando forma, un mapa y un prototipo ayudan a decidir qué vale la pena desarrollar y qué puede esperar.',
            includes:['Mapa de contenido','Recorrido principal','Prototipo','Validación inicial'],
            tech:['UX / estructura','HTML + CSS','Prototipado'],
            project:{image:'media/projects/onevet.webp',name:'OneVet Store · proyecto académico',caption:'Ejemplo de cómo una idea amplia puede ordenarse por áreas antes de seguir creciendo.'},
            alt:'landing'
        },
        landing: {
            title:'Landing enfocada en una sola acción', icon:'🎯', service:'pagina-web', level:'Inicial',
            reason:'Tu prioridad es explicar una propuesta y llevar a la persona a una acción concreta sin distraerla.',
            priority:'Mensaje claro + llamada a la acción visible.',
            later:'Blog, área privada o muchas páginas internas.',
            why:'Una landing funciona bien para validar una propuesta, captar consultas o presentar un servicio con un recorrido corto.',
            includes:['Portada clara','Beneficios','Prueba o ejemplo','Formulario','Responsive'],
            tech:['HTML','CSS','JavaScript','Netlify Forms'],
            project:{image:'media/projects/landing.webp',name:'INGPRO · formulario de contacto',caption:'Referencia real de una experiencia orientada a llevar al visitante hacia una consulta.'},
            alt:'corporate'
        },
        corporate: {
            title:'Web corporativa clara y escalable', icon:'🏢', service:'pagina-web', level:'Intermedio',
            reason:'Necesitas un lugar propio que explique tu negocio con orden, confianza y espacio para crecer por secciones.',
            priority:'Servicios, evidencia, navegación y contacto.',
            later:'Funciones complejas que no aporten todavía al objetivo principal.',
            why:'Una web corporativa centraliza quién eres, qué haces, tus trabajos y la forma de contactarte sin depender de publicaciones dispersas.',
            includes:['Servicios','Empresa o perfil','Proyectos','Contacto','Responsive'],
            tech:['HTML','CSS','JavaScript','SEO básico'],
            project:{image:'media/projects/corporate.webp',name:'INGPRO · sitio corporativo',caption:'Proyecto real organizado por líneas de servicio, trabajos y canales de contacto.'},
            alt:'landing'
        },
        catalog: {
            title:'Catálogo digital consultable', icon:'🗂️', service:'pagina-web', level:'Intermedio',
            reason:'La prioridad es que las personas exploren lo que ofreces sin preguntarte una por una cada opción.',
            priority:'Categorías, imágenes y consulta contextual.',
            later:'Pago online si la venta todavía se coordina personalmente.',
            why:'Un catálogo ordena productos o servicios y reduce preguntas repetidas sin obligarte a convertir el proyecto en ecommerce.',
            includes:['Categorías','Fichas visuales','Filtros','Consulta directa','Responsive'],
            tech:['HTML','CSS','JavaScript','JSON'],
            project:{image:'media/projects/catalog.webp',name:'El Chinito · categorías',caption:'Proyecto real con catálogo, filtros y recorrido pensado para encontrar productos rápidamente.'},
            alt:'corporate'
        },
        portfolio: {
            title:'Portafolio visual con casos destacados', icon:'🖼️', service:'pagina-web', level:'Inicial–intermedio',
            reason:'Tu mejor argumento está en mostrar lo que ya haces, con imágenes y contexto breve en vez de grandes bloques de texto.',
            priority:'Casos, imágenes y qué resolvió cada trabajo.',
            later:'Secciones genéricas que no demuestren experiencia real.',
            why:'Cuando la decisión depende de la confianza, los ejemplos concretos explican mejor tu trabajo que una lista extensa de servicios.',
            includes:['Casos reales','Galerías','Contexto breve','Servicios relacionados','Contacto'],
            tech:['HTML','CSS','JavaScript','Galerías'],
            project:{image:'media/projects/portfolio.webp',name:'INGPRO · trabajos reales',caption:'Ejemplo de portafolio donde el contenido visual demuestra capacidades y resultados.'},
            alt:'corporate'
        },
        socialhub: {
            title:'Puente de Instagram a un sitio propio', icon:'🔗', service:'pagina-web', level:'Inicial',
            reason:'Ya tienes presencia en redes; falta un lugar estable donde la persona entienda tu oferta sin revisar publicaciones antiguas.',
            priority:'Resumen del negocio, oferta actual y contacto.',
            later:'Duplicar todo Instagram dentro del sitio.',
            why:'La red social puede atraer y la web ordenar la información, resolver dudas y facilitar el contacto.',
            includes:['Presentación','Servicios/productos','Preguntas frecuentes','Redes','Formulario'],
            tech:['HTML','CSS','Instagram','Netlify Forms'],
            project:{image:'media/projects/social.webp',name:'El Chinito · presencia digital',caption:'Ejemplo de una web que concentra información comercial que normalmente estaría repartida en redes.'},
            alt:'catalog'
        },
        conversion: {
            title:'Optimización para generar más consultas', icon:'💬', service:'otro', level:'Intermedio',
            reason:'No parece necesario rehacer todo; conviene mejorar el recorrido para que una visita termine más fácilmente en contacto.',
            priority:'CTA, confianza, recorrido y formulario.',
            later:'Cambios decorativos que no mejoren ninguna acción.',
            why:'Si existen visitas pero pocas consultas, hay que revisar dónde se pierde la intención: mensaje, jerarquía, evidencia o contacto.',
            includes:['Auditoría de recorrido','CTA claros','Formulario contextual','Prueba social'],
            tech:['UX','JavaScript','Netlify Forms','Medición básica'],
            project:{image:'media/projects/landing.webp',name:'INGPRO · contacto contextual',caption:'Referencia real donde el formulario es parte del recorrido y no un elemento aislado.'},
            alt:'redesign'
        },
        redesign: {
            title:'Rediseño responsive por prioridades', icon:'📱', service:'otro', level:'Intermedio',
            reason:'La base puede servir, pero la experiencia necesita reorganizarse para pantallas reales, especialmente celular.',
            priority:'Jerarquía, navegación, espacios y alturas.',
            later:'Agregar funciones antes de estabilizar la experiencia.',
            why:'Responsive no significa encoger la versión de computador: implica redistribuir contenido y controles según el espacio disponible.',
            includes:['Mobile first','Navbar','Jerarquía','Alturas estables','Pruebas'],
            tech:['HTML','CSS','JavaScript','Responsive'],
            project:{image:'media/projects/responsive.webp',name:'INGPRO · vista móvil',caption:'Captura real usada como referencia para revisar composición y navegación en celular.'},
            alt:'restructure'
        },
        restructure: {
            title:'Reorganización UX y contenido', icon:'🧭', service:'otro', level:'Intermedio',
            reason:'El problema principal es de claridad: qué mostrar primero, cómo agruparlo y cómo ayudar al visitante a avanzar.',
            priority:'Arquitectura, menú y reducción de ruido.',
            later:'Agregar más contenido antes de ordenar el existente.',
            why:'Una web puede tener buena información y seguir siendo difícil de usar. Reorganizarla puede aportar más que sumar secciones.',
            includes:['Mapa de contenidos','Menú','Prioridades','Bloques breves','CTA'],
            tech:['UX','HTML','CSS','JavaScript'],
            project:{image:'media/projects/restructure.webp',name:'INGPRO · catálogo organizado',caption:'Ejemplo real de contenido amplio que necesita jerarquía y navegación clara.'},
            alt:'redesign'
        },
        evolution: {
            title:'Evolución funcional de tu web', icon:'🧩', service:'otro', level:'Intermedio–avanzado',
            reason:'Tu sitio ya cumple una base; la mejor ruta es sumar una función concreta sin perder lo que ya funciona.',
            priority:'Definir una función nueva y cómo se integra al flujo actual.',
            later:'Reescribir todo el proyecto sin una razón técnica.',
            why:'Crecer por módulos permite mantener estabilidad y comprobar el valor de cada mejora antes de agregar la siguiente.',
            includes:['Revisión técnica','Nueva función','Validaciones','Integración','Pruebas'],
            tech:['JavaScript','API REST','Validaciones','Git'],
            project:{image:'media/projects/onevet-cart.webp',name:'OneVet Store · carrito',caption:'Proyecto académico con funciones que se agregan sobre una experiencia web existente.'},
            alt:'app'
        },
        app: {
            title:'Aplicación web con lógica y datos', icon:'☕', service:'aplicacion-java', level:'Avanzado',
            reason:'Tu necesidad ya no es solo mostrar información: necesitas procesar, guardar o responder según reglas.',
            priority:'Proceso, datos y reglas de negocio.',
            later:'Diseñar muchas pantallas antes de definir cómo funciona el sistema.',
            why:'Cuando hay registros, estados, validaciones o automatización, la solución debe diseñarse desde la lógica y la persistencia.',
            includes:['Backend','Base de datos','API REST','Validaciones','Interfaz'],
            tech:['Java','Spring Boot','API REST','H2 / MySQL'],
            project:{image:'media/projects/onevet-products.webp',name:'OneVet · familia de proyectos académicos',caption:'Referencia visual del proyecto veterinario. El trabajo OneVet API aplica Java, Spring Boot, API REST y H2.'},
            alt:'evolution'
        },
        internal: {
            title:'Herramienta interna para ordenar un proceso', icon:'📊', service:'aplicacion-java', level:'Avanzado',
            reason:'El problema está en la operación interna: tareas repetidas, registros separados o información difícil de consultar.',
            priority:'Entradas, responsables, estados y resultado del proceso.',
            later:'Una web pública grande si el problema real ocurre dentro del negocio.',
            why:'Una herramienta interna puede aportar más que una página de marketing cuando el mayor costo está en repetir tareas o perder información.',
            includes:['Registros','Estados','Búsqueda','Roles','Base de datos'],
            tech:['Java','Spring Boot','MVC','Base de datos'],
            project:{image:'media/projects/onevet-products.webp',name:'OneVet · gestión de información',caption:'Referencia académica de una interfaz de datos; una herramienta interna añadiría lógica, estados y persistencia.'},
            alt:'app'
        },
        knowledge: {
            title:'Centro de información fácil de consultar', icon:'📚', service:'pagina-web', level:'Inicial–intermedio',
            reason:'La información existe, pero está dispersa en archivos, mensajes o documentos difíciles de recorrer.',
            priority:'Categorías, rutas y respuestas fáciles de encontrar.',
            later:'Funciones transaccionales que todavía no necesitas.',
            why:'Convertir contenido suelto en una experiencia navegable reduce preguntas repetidas y hace que la información trabaje por ti.',
            includes:['Categorías','Buscador','Preguntas frecuentes','Recursos','Contacto'],
            tech:['HTML','CSS','JavaScript','Buscador'],
            project:{image:'media/projects/onevet-education.webp',name:'OneVet Store · contenido educativo',caption:'Proyecto académico donde el contenido se organiza para que el usuario pueda explorar información por temas.'},
            alt:'socialhub'
        }
    };

    const stageLabels = {
        idea:'Idea en etapa inicial', business:'Negocio activo', site:'Web existente', unsure:'Etapa de exploración'
    };

    const terms = {
        responsive:['Responsive','La interfaz se reorganiza para seguir siendo cómoda en celular, tablet y computador.'],
        domain:['Dominio','Es la dirección del sitio, por ejemplo janabith.cl.'],
        hosting:['Hosting','Es el lugar donde quedan publicados los archivos o la aplicación para que estén disponibles en internet.'],
        backend:['Backend','Es la parte que maneja lógica, datos, usuarios o reglas que no se ven directamente en pantalla.'],
        catalog:['Catálogo digital','Organiza productos, servicios o trabajos para que se puedan explorar y consultar sin que necesariamente exista compra online.'],
        form:['Formulario','Recoge una consulta de manera estructurada y puede enviarla a un servicio como Netlify Forms.']
    };

    const questions = [...document.querySelectorAll('.question-screen')];
    const advisor = document.querySelector('#orientador');
    const resultCard = document.querySelector('#resultado');
    const compareCard = document.querySelector('#comparar');
    const nextCard = document.querySelector('#siguiente');
    const stepNumber = document.querySelector('[data-step-number]');
    const progressBar = document.querySelector('[data-progress-bar]');
    const backButton = document.querySelector('[data-back]');
    const selectionHint = document.querySelector('[data-selection-hint]');

    document.querySelector('[data-start]')?.addEventListener('click', () => advisor.scrollIntoView({behavior:'smooth',block:'start'}));

    function optionButton(key, [value, icon, title, copy]) {
        return `<button class="choice-card" type="button" data-answer="${key}" data-value="${value}"><span class="choice-card__icon">${icon}</span><strong>${title}</strong><small>${copy}</small></button>`;
    }

    function renderDynamicQuestion(key) {
        const config = flows[state.answers.stage]?.[key];
        if (!config) return;
        const screen = document.querySelector(`[data-question="${key}"]`);
        screen.querySelector('[data-question-title]').textContent = config.title;
        screen.querySelector('[data-question-help]').textContent = config.help;
        screen.querySelector(`[data-dynamic-options="${key}"]`).innerHTML = config.options.map((opt) => optionButton(key,opt)).join('');
        bindChoiceEvents(screen);
    }

    function showStep(index) {
        state.step = Math.max(0,Math.min(index,questions.length-1));
        questions.forEach((q,i)=>{ q.hidden=i!==state.step; q.classList.toggle('is-active',i===state.step); });
        stepNumber.textContent=String(state.step+1);
        progressBar.style.width=`${((state.step+1)/questions.length)*100}%`;
        backButton.disabled=state.step===0;
        selectionHint.textContent=state.step===2?'Última decisión.':'Selecciona una opción para continuar.';
    }

    function bindChoiceEvents(root=document) {
        root.querySelectorAll('[data-answer]').forEach((button)=>{
            if (button.dataset.bound==='1') return;
            button.dataset.bound='1';
            button.addEventListener('click',()=>{
                const key=button.dataset.answer;
                state.answers[key]=button.dataset.value;
                root.querySelectorAll(`[data-answer="${key}"]`).forEach((el)=>el.classList.toggle('is-selected',el===button));
                setTimeout(()=>{
                    if (key==='stage') {
                        state.answers.need=''; state.answers.readiness='';
                        renderDynamicQuestion('need');
                    }
                    if (key==='need') renderDynamicQuestion('readiness');
                    if (state.step<questions.length-1) {
                        showStep(state.step+1);
                        questions[state.step].scrollIntoView({behavior:'smooth',block:'center'});
                    } else renderResult();
                },170);
            });
        });
    }

    bindChoiceEvents();
    backButton.addEventListener('click',()=>showStep(state.step-1));

    function chooseResult() {
        const {stage,need,readiness}=state.answers;
        if (stage==='idea') {
            if (need==='system') return readiness==='blank' ? 'discovery' : 'app';
            if (need==='showcase') return readiness==='blank' ? 'discovery' : 'portfolio';
            if (need==='capture') return 'landing';
            if (need==='present') return readiness==='blank' ? 'discovery' : 'landing';
        }
        if (stage==='business') {
            if (need==='manage') return readiness==='tools' ? 'internal' : 'app';
            if (need==='browse') return 'catalog';
            if (need==='contact') return readiness==='social' ? 'socialhub' : 'landing';
            if (need==='trust') return readiness==='social' ? 'socialhub' : 'corporate';
        }
        if (stage==='site') {
            if (need==='mobile') return 'redesign';
            if (need==='clarity') return 'restructure';
            if (need==='conversion') return 'conversion';
            if (need==='features') return readiness==='keep' ? 'evolution' : 'app';
        }
        if (stage==='unsure') {
            if (need==='manual') return readiness==='fuzzy' ? 'discovery' : 'internal';
            if (need==='files') return 'knowledge';
            if (need==='messages') return readiness==='fuzzy' ? 'discovery' : 'landing';
            if (need==='socialonly') return readiness==='fuzzy' ? 'discovery' : 'socialhub';
        }
        return 'discovery';
    }

    function summaryText() {
        const {stage,need,readiness}=state.answers;
        const lookup = flows[stage];
        const needText = lookup.need.options.find(o=>o[0]===need)?.[2]?.toLowerCase() || need;
        const readyText = lookup.readiness.options.find(o=>o[0]===readiness)?.[2]?.toLowerCase() || readiness;
        return `${stageLabels[stage]}; tu foco es ${needText} y hoy ${readyText}.`;
    }

    function personalizedReason(base) {
        const {stage}=state.answers;
        const suffix = {
            business:' Ya existe una actividad real, así que conviene construir desde cómo hoy te encuentran y consultan.',
            site:' La idea es conservar lo útil y corregir lo que hoy frena la experiencia.',
            idea:' Conviene empezar pequeño y validar antes de sumar funciones secundarias.',
            unsure:' La prioridad es ganar claridad antes de elegir herramientas.'
        }[stage] || '';
        return `${base.reason}${suffix}`;
    }

    function renderResult() {
        const key=chooseResult();
        const solution=resultLibrary[key];
        state.result={key,...solution};
        resultCard.dataset.solution=key;
        document.body.dataset.solution=key;
        document.querySelector('[data-result-icon]').textContent=solution.icon;
        document.querySelector('[data-result-title]').textContent=solution.title;
        document.querySelector('[data-result-reason]').textContent=personalizedReason(solution);
        document.querySelector('[data-result-priority]').textContent=solution.priority;
        document.querySelector('[data-result-later]').textContent=solution.later;
        document.querySelector('[data-result-level]').textContent=`Complejidad orientativa: ${solution.level}`;
        document.querySelector('[data-result-stage-label]').textContent=stageLabels[state.answers.stage];
        document.querySelector('[data-result-why]').textContent=solution.why;
        document.querySelector('[data-result-includes]').innerHTML=solution.includes.map(i=>`<span>${i}</span>`).join('');
        document.querySelector('[data-result-tech]').innerHTML=solution.tech.map(i=>`<span>${i}</span>`).join('');
        const projectImage=document.querySelector('[data-project-image]');
        projectImage.src=solution.project.image;
        projectImage.alt=solution.project.name;
        document.querySelector('[data-project-name]').textContent=solution.project.name;
        document.querySelector('[data-project-caption]').textContent=solution.project.caption;
        document.querySelector('[data-user-summary]').textContent=summaryText();
        document.querySelector('[data-final-icon]').textContent=solution.icon;
        document.querySelector('[data-final-title]').textContent=solution.title;
        resultCard.hidden=false; compareCard.hidden=false; nextCard.hidden=false;
        document.querySelector('[data-why-panel]').hidden=true;
        document.querySelector('[data-toggle-why] span').textContent='+';
        renderComparison('primary');
        updateContactLink();
        setTimeout(()=>resultCard.scrollIntoView({behavior:'smooth',block:'start'}),90);
    }

    document.querySelector('[data-toggle-why]')?.addEventListener('click',(event)=>{
        const panel=document.querySelector('[data-why-panel]'); panel.hidden=!panel.hidden;
        event.currentTarget.querySelector('span').textContent=panel.hidden?'+':'−';
    });

    document.querySelector('[data-restart]')?.addEventListener('click',()=>{
        state.answers={stage:'',need:'',readiness:''}; state.result=null;
        delete resultCard.dataset.solution;
        delete document.body.dataset.solution;
        document.querySelectorAll('.choice-card').forEach(c=>c.classList.remove('is-selected'));
        resultCard.hidden=true; compareCard.hidden=true; nextCard.hidden=true;
        showStep(0); advisor.scrollIntoView({behavior:'smooth',block:'start'});
    });

    function comparisonFeatures(solution) {
        return [solution.priority,...solution.includes.slice(0,3)];
    }

    function renderComparison(mode) {
        if (!state.result) return;
        const solution = mode==='alternative' ? resultLibrary[state.result.alt] : resultLibrary[state.result.key];
        document.querySelector('[data-compare-view]').innerHTML=`<article class="compare-solution"><div class="compare-solution__head"><span>${solution.icon}</span><h3>${solution.title}</h3></div><p>${solution.reason}</p><div class="feature-list">${comparisonFeatures(solution).map(item=>`<span>${item}</span>`).join('')}</div><div class="compare-tech">${solution.tech.slice(0,3).map(item=>`<b>${item}</b>`).join('')}</div></article>`;
    }

    document.querySelectorAll('[data-compare]').forEach(tab=>tab.addEventListener('click',()=>{
        document.querySelectorAll('[data-compare]').forEach(item=>{const active=item===tab;item.classList.toggle('is-active',active);item.setAttribute('aria-selected',String(active));});
        renderComparison(tab.dataset.compare);
    }));

    const termAnswer=document.querySelector('[data-term-answer]');
    document.querySelectorAll('[data-term]').forEach(button=>button.addEventListener('click',()=>{
        const [title,text]=terms[button.dataset.term];
        document.querySelectorAll('[data-term]').forEach(item=>item.classList.toggle('is-active',item===button));
        termAnswer.innerHTML=`<span>💡</span><p><strong>${title}:</strong> ${text}</p>`;
    }));

    const modal=document.querySelector('[data-modal]');
    const modalContent=document.querySelector('[data-modal-content]');
    function openModal(html){modalContent.innerHTML=html;modal.hidden=false;document.body.style.overflow='hidden';}
    function closeModal(){modal.hidden=true;document.body.style.overflow='';}
    document.querySelectorAll('[data-close-modal]').forEach(item=>item.addEventListener('click',closeModal));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal();});

    document.querySelector('[data-open-example]')?.addEventListener('click',()=>{
        if (!state.result) return;
        const project=state.result.project;
        const tech=state.result.tech.map(item=>`<span class="modal-tech-chip">${item}</span>`).join('');
        openModal(`<div class="modal-content"><p class="section-tag section-tag--green">REFERENCIA RELACIONADA</p><h2 id="modalTitle">${project.name}</h2><p>${project.caption}</p><div class="example-frame"><img src="${project.image}" alt="${project.name}"><div class="example-note"><strong>Stack o enfoque relacionado:</strong><div class="modal-tech-list">${tech}</div></div></div></div>`);
    });

    document.querySelector('[data-open-glossary]')?.addEventListener('click',()=>{
        openModal(`<div class="modal-content"><p class="eyebrow">Diccionario rápido</p><h2 id="modalTitle">Tecnología en palabras simples</h2><div class="glossary-list">${Object.values(terms).map(([title,text])=>`<article><strong>${title}</strong><p>${text}</p></article>`).join('')}</div></div>`);
    });

    function updateContactLink() {
        const s=state.result;
        const message=`Hola, llegué desde Explora y completé el orientador. Mi mapa inicial fue: ${s.title}. ${summaryText()} Prioridad sugerida: ${s.priority} Quiero conversar sobre esta idea.`;
        const params=new URLSearchParams({servicio:s.service,origen:'Explora · Orientador interactivo',mensaje:message});
        document.querySelector('[data-contact]').href=`../pages/contacto.html?${params.toString()}#formulario-contacto`;
        const whatsapp = document.querySelector('.explora-whatsapp');
        if (whatsapp) {
            whatsapp.href=`https://wa.me/56972367335?text=${encodeURIComponent(message)}`;
        }
    }

    document.querySelector('[data-copy-result]')?.addEventListener('click',async(event)=>{
        if(!state.result)return;
        const text=`Mi mapa inicial en Janabith Explora: ${state.result.title}. ${summaryText()} Prioridad: ${state.result.priority}`;
        try{await navigator.clipboard.writeText(text);event.currentTarget.textContent='✓ Resultado copiado';setTimeout(()=>event.currentTarget.textContent='Copiar mi resultado',1800);}catch{event.currentTarget.textContent='No se pudo copiar automáticamente';}
    });

    showStep(0);
})();
