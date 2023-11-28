import React from 'react';
import { Tree } from 'react-d3-tree';
import { useState, useEffect } from 'react';
import BinarySearchTree from '../functions/BinarySearchTree';
import '../styles/index.css';

function Index() {

    const [tree, setTree] = useState(new BinarySearchTree());
    const [nodeValue, setNodeValue] = useState('');
    const [treeData, setTreeData] = useState({});

    const handleAddNode = () => {
        if (nodeValue.trim() === '') {
            alert('Por favor, escribe algún valor.');
            return;
        }
        tree.add(parseInt(nodeValue, 10));
        setTreeData(generateTreeData(tree.root));
        setNodeValue('');
    };

    const handleRemoveNode = () => {
        if (nodeValue.trim() === '') {
            alert('Por favor, escribe algún valor.');
            return;
        }
        tree.remove(parseInt(nodeValue, 10));
        setTreeData(generateTreeData(tree.root));
        setNodeValue('');
    };

    const handleCheckNode = () => {
        if (nodeValue.trim() === '') {
            alert('Por favor, escribe algún valor.');
            return;
        }
        alert(tree.contains(parseInt(nodeValue, 10)) ? 'El nodo existe' : 'El nodo no existe');
        setNodeValue('');
    };

    // Función para generar datos del árbol en un formato adecuado para react-d3-tree
    const generateTreeData = (node) => {
        if (!node) return {};
        return {
            name: node.value.toString(),
            children: [node.left && generateTreeData(node.left), node.right && generateTreeData(node.right)].filter(Boolean),
        };
    };

    return (
        <>
            <body>
                <div className='container-input'>
                    <div className='input-box'>
                        <input
                            type="number"
                            value={nodeValue}
                            onChange={(e) => setNodeValue(e.target.value)}
                            placeholder="Ingresa el valor del nodo..."
                        />
                    </div>
                    <p>Tamaño del árbol: {tree.size()}</p>
                    <p>Contenido del árbol: {JSON.stringify(tree.toArray())}</p>
                </div>

                <div className='container-input'>
                    <button className='btn-agregar' onClick={handleAddNode}>Agregar nodo</button>
                    <button className='btn-buscar' onClick={handleCheckNode}>Buscar nodo</button>
                    <button className='btn-eliminar' onClick={handleRemoveNode}>Eliminar nodo</button>
                </div>

                <div className='container-tree'>
                    <Tree data={treeData} orientation="vertical"
                        translate={{ x: 350, y: 50 }}
                    />
                </div>
            </body>
        </>
    );
}

export default Index;