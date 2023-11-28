//Clase o función base para el árbol binario
function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype = {
    //contructor
    constructor: BinarySearchTree,

    //función para añadir un nodo a un árbol   
    add: function (value) {
        var node = {
            value: value,
            left: null,
            right: null
        };
        var current;
        if (this.root === null) {
            this.root = node;
        } else {
            current = this.root;
            while (true) {
                if (value < current.value) {
                    if (current.left === null) {
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }
                } else if (value > current.value) {
                    if (current.right === null) {  // Corregido aquí
                        current.right = node;     // Corregido aquí
                        break;
                    } else {
                        current = current.right;
                    }
                } else {
                    break;
                }
            }
        }
    },

    //función para determinar si existe o no un nodo en un árbol
    contains: function (value) {
        var found = false;
        var current = this.root;  // Corregido aquí

        while (!found && current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        return found;
    },

    //Función que realiza el recorrido de un árbol en orden
    traverse: function (process) {

        // helper function
        function inOrder(node) {
            if (node) {
                // traverse the left subtree
                if (node.left !== null) {
                    inOrder(node.left);
                }

                // call the process method on this node
                process.call(this, node);

                // traverse the right subtree
                if (node.right !== null) {
                    inOrder(node.right);
                }
            }
        }

        // Iniciar con el nodo raíz
        inOrder(this.root);
    },

    //función que elimina un nodo de un árbol binario
    remove: function (value) {
        var found = false,
            parent = null,
            current = this.root,
            childCount,
            replacement,
            replacementParent;

        // Asegurarse que hay un nodo para buscar
        while (!found && current) {

            // si el valor es menor que el nodo actual o current, ir a la izquierda
            if (value < current.value) {
                parent = current;
                current = current.left;

                // si el valor es mayor que el nodo actual o current, ir a la derecha
            } else if (value > current.value) {
                parent = current;
                current = current.right;

                // si el valor es igual, encontrado!
            } else {
                found = true;
            }
        }

        // solo ejecutar si el nodo es encontrado!
        // only proceed if the node was found
        //There are three conditions to be aware of when deleting nodes:
        //   Leaf node
        //   Node with only one child
        //   Node with two children
        if (found) {

            // figure out how many children
            childCount = (current.left !== null ? 1 : 0) +
                (current.right !== null ? 1 : 0);

            // special case: the value is at the root
            if (current === this.root) {
                switch (childCount) {
                    // no children, just erase the root
                    case 0:
                        this.root = null;
                        break;

                    // one child, use one as the root
                    case 1:
                        this.root = (current.right === null ?
                            current.left : current.right);
                        break;

                    // two children, little work to do
                    case 2:

                        // new root will be the old root's left child
                        //...maybe
                        replacement = this.root.left;

                        // find the right-most leaf node to be 
                        // the real new root
                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        // it's not the first node on the left
                        if (replacementParent != null) {

                            // remove the new root from it's 
                            // previous position                      
                            replacementParent.right = replacement.left;

                            // give the new root all of the old 
                            // root's children
                            replacement.right = this.root.right;
                            replacement.left = this.root.left;
                        } else {

                            // just assign the children
                            replacement.right = this.root.right;
                        }

                        // officially assign new root
                        this.root = replacement;
                    // no default
                }
                // non-root values
            } else {

                switch (childCount) {

                    // no children, just remove it from the parent
                    case 0:
                        // if the current value is less than its 
                        // parent's, null out the left pointer
                        if (current.value < parent.value) {
                            parent.left = null;

                            // if the current value is greater than its
                            // parent's, null out the right pointer
                        } else {
                            parent.right = null;
                        }
                        break;

                    // one child, just reassign to parent
                    case 1:
                        // if the current value is less than its 
                        // parent's, reset the left pointer
                        if (current.value < parent.value) {
                            parent.left = (current.left === null ?
                                current.right : current.left);

                            // if the current value is greater than its 
                            // parent's, reset the right pointer
                        } else {
                            parent.right = (current.left === null ?
                                current.right : current.left);
                        }
                        break;


                    // two children, a bit more complicated
                    case 2:

                        // reset pointers for new traversal
                        replacement = current.left;
                        replacementParent = current;

                        // find the right-most node
                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        replacementParent.right = replacement.left;

                        // assign children to the replacement
                        replacement.right = current.right;
                        replacement.left = current.left;

                        // place the replacement in the right spot
                        if (current.value < parent.value) {
                            parent.left = replacement;
                        } else {
                            parent.right = replacement;
                        }

                    // no default
                }
            }
        }
    },

    //Calcula el tamaño de un árbol binario
    size: function () {
        var length = 0;

        this.traverse(function (node) {
            length++;
        });

        return length;
    },

    //Vacía el contenido del árbol binario a un arreglo de tipo pila, acomoda en orden
    toArray: function () {
        var result = [];

        this.traverse(function (node) {
            result.push(node.value);
        });

        return result;
    },

    //convierte el arreglo con los nodos del árbol en string plano
    toString: function () {
        return this.toArray().toString();
    }
};

var tree = new BinarySearchTree();
console.log("Añadiendo 4 valores al árbol binario: 10, 5, 15, 25 (en desorden)")
tree.add(10);
tree.add(5);
tree.add(15);
tree.add(25);
console.log("Existe el valor 15 en el árbol?: " + tree.contains(15));
console.log("Tamaño árbol: " + tree.size());
console.log("Imprimir el recorrido del árbol en orden: ");
tree.traverse(function (node) {
    console.log(node.value);
});
console.log("Elimina el nodo 10 del árbol (el  nodo raíz)");
tree.remove(10);
console.log("Tamaño árbol: " + tree.size());
console.log("Imprimir el recorrido del árbol en orden con un arreglo pila: ");
console.log(tree.toArray());
console.log("Imprimir el recorrido del árbol en orden en formato string plano: ");
console.log(tree.toString());