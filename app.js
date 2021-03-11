//3. Create a BST Class
class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value) {
        //If the tree is empty then this key being inserted is the root node of the
        //tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }
        /*If the tree already exisits, then start at the root and compare it
        to  the key you want to insert. If the new key is less than the node's key
        then the new node needs to live in the left-hand branch*/
        else if (key < this.key) {
            /*If the existing node does not have a left child, meaning that if the
            'left' pointer is empty, then we can just instantiate and insert the
            new node as the left child of that node, passing 'this' as the parent*/
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /*If the node has an existing left child, then we recursively call the 
            'insert' method so the node is added further down the tree*/
            else {
                this.left.insert(key, value);
            }
        }
        /*Similarly, if the new key is greater than the node's key, do the same
        thing but on the right hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this)
            }
            else {
                this.right.insert(key, value)
            }
        }
    }
    //retrieve
    find(key) {
        //If item is found at the root then return that value
        if (this.key == key) {
            return this.value
        }
        /*If the item you are looking for is less than the root then follow the left
        child. If there is an existing left childe, then recursively check its left
        and/ or right child until you find the item*/
        else if (key < this.key && this.left) {
            return this.left.find(key); 
        }
        /*If the item you are looking for is greater than the root then follow
        the right child. If there is an existing right child, the recursively check its
        left and/ or right child until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        //You have searched the tree and the item is not there
        else {
            throw new Error('Key Error')
        }
    }
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            //If the node only has a left child, then you replace the node with its
            //left child
            else if (this.left) {
                this._replaceWith(this.left);
            }
            //If the node only has a right child, replace it with its right child
            else if (this.right) {
                this._replaceWith(this.right);
            } 
            //If the node has no children then simply remove it and any references to
            //it by calling "this._replaceWith(null)""
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error ('Key Error');
        }
    }

    //helper methods used to remove a node
    _replaceWith(node) {
        if (this.parent) {
            if (this === this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }
            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }
    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

//4. What does this program do?
function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}
//O(n)- adds a root to a tree???

//5. Height of a BST
//write an algorithm to find the height of a binary search tree. What is the time
//complexity?

//6. Is it a BST?
//Write an algorithm to check whether an arbitray binary tree is a binary search
//tree, assuming the tree doesn't contain duplicates

//7. 3rd largest node
//Write an algorithm to find the 3rd largets node in a binary search tree

//8. Balanced BST
//Write an algorithm that checks if a BST is balanced (no two leaves differ in
//distance from the root by more than 1)

//base case
function createBalancesBst(arr) {
    if (!arr.length) {
        return null
    }
    //create middle index and middle value to determine root node
    const middleIndex = Math.floor(arr.length /2);
    const middleValue = arr[middleIndex];
    console.log(middleIndex);
    console.log(middleValue);

    const left = arr.slice(0, middleIndex);
    const right = arr.slice(middleIndex + 1);
    console.log(left);
    console.log(right);

    //call function again on left and right sides 
    const leftSubtree = createBalancesBst(left);
    const rightSubtree = createBalancesBst(right);
    const node = new BinarySearchTree(middleValue);
    node.left = leftSubtree;
    node.right = rightSubtree;

    return node;
}
console.log(createBalancesBst([1,2,3,5,7,9,11]))

//Are they the same BSTs? Two arrays represent two sequences of keys that are
//used to create two binary search trees. Write a program that will tell whether
//the two BSTs will be identical or not without actually constructing the tree
//You may use another data structure such as an array or linked list but don't 
//construct the BST. What is the time complexity
//Input: 3,5,4,6,1,0,2 and 3,1,5,2,4,6,0
//Output: true