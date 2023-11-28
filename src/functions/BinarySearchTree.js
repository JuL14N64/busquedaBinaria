import React from 'react';

function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype = {
    constructor: BinarySearchTree,

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
                    if (current.right === null) {
                        current.right = node;
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

    contains: function (value) {
        var found = false;
        var current = this.root;

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

    traverse: function (process) {
        function inOrder(node) {
            if (node) {
                if (node.left !== null) {
                    inOrder(node.left);
                }
                process.call(this, node);
                if (node.right !== null) {
                    inOrder(node.right);
                }
            }
        }

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

    size: function () {
        var length = 0;
        this.traverse(function () {
            length++;
        });
        return length;
    },

    toArray: function () {
        var result = [];
        this.traverse(function (node) {
            result.push(node.value);
        });
        return result;
    },

    toString: function () {
        return this.toArray().toString();
    }
};

export default BinarySearchTree;