import React, { useEffect, useState } from "react";

const Main = () => {
    const [tareas, setTareas] = useState(() => {
        const saved = (localStorage.getItem('tareas'))
        const valorInicial = JSON.parse(saved)
        return valorInicial || []
    })
    const [input, setInput] = useState('')

    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(tareas))
    }, [tareas])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!input) return
        const tareasUpdate = [ {texto: input, completado: false}, ...tareas ]
        setTareas(tareasUpdate)
        setInput('')
    }

    const todoComplete = (tareaArg) => {
        setTareas( prevTareas => {
            const tareaCompleta =  prevTareas.map(tarea => {
                if (tarea.texto == tareaArg.texto) {
                    return {...tarea, completado: !tarea.completado}
                } else return tarea
            })
            return tareaCompleta
        })
    }

    const styleCompletado = {
        textDecoration: 'line-through',
    }

    const styleNoCompletado = {
        textDecoration: 'none',
    }


    const todoDelete = (id) => {
        const tareasBorrado = [...tareas].filter(tarea => tarea.texto !== id)
        setTareas(tareasBorrado)
    }


    const elementos = tareas.map(tarea => {
        return (
            <span key={tarea.texto} className="contenido-tarea">
                <p 
                className="contenido-tarea-texto" 
                style={tarea.completado ? styleCompletado : styleNoCompletado }>
                {tarea.texto}
                </p>
                <button onClick={() => todoComplete(tarea)} className="contenido-boton-completo">✓</button>
                <button onClick={() => todoDelete(tarea.texto)} className="contenido-boton-borrar">✕</button>
            </span>
        )
    })


    return (
        <main>
            <form onSubmit={handleSubmit} className="main-section">
                <input
                    type='text'
                    className="main-input"
                    placeholder="Ingresa una tarea"
                    value={input}
                    onChange={handleChange}
                    autoFocus
                />
                <button className="main-boton">+</button>
            </form>

            <section className="contenido">
                {elementos}
            </section>
        </main>
    )
}

export default Main