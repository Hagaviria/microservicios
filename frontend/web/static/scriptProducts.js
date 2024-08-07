function fetchProducts() {
  fetch('http://192.168.80.3:5003/api/products')
    .then((response) => response.json())
    .then((products) => {
      // Handle success
      console.log(products);

      let productTableBody = document.querySelector('#product-list tbody');
      productTableBody.innerHTML = '';

      products.forEach((product) => {
        let row = document.createElement('tr');

        // Name
        let nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        // Description
        let descriptionCell = document.createElement('td');
        descriptionCell.textContent = product.description;
        row.appendChild(descriptionCell);

        // Price
        let priceCell = document.createElement('td');
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        // Actions
        let actionsCell = document.createElement('td');

        // Edit link
        let editLink = document.createElement('a');
        editLink.href = `/editProduct/${product.id}`;
        editLink.textContent = 'Edit';
        editLink.className = 'btn btn-primary mr-2';
        actionsCell.appendChild(editLink);

        // Delete link
        let deleteLink = document.createElement('a');
        deleteLink.href = '#';
        deleteLink.textContent = 'Delete';
        deleteLink.className = 'btn btn-danger';
        deleteLink.addEventListener('click', () => {
          removeProduct(product.id);
        });
        actionsCell.appendChild(deleteLink);

        row.appendChild(actionsCell);

        productTableBody.appendChild(row);
      });
    });
}

function addProduct() {
  let productData = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
  };

  fetch('http://192.168.80.3:5003/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })
    .then((response) => {
      if (response.status !== 201) {
        throw new Error('Error adding product');
      }
      return response.json();
    })
    .then((product) => {
      console.log('Product added:', product);
    })
    .catch((error) => console.error('Error:', error));
}

function removeProduct(id) {
  console.log('Removing product with id:', id);
  if (confirm('Are you sure you want to delete this product?')) {
    fetch(`http://192.168.80.3:5003/api/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status !== 202) {
          throw new Error('Error removing product');
        }
        return response.json();
      })
      .then((result) => {
        console.log('Product removed:', result);
        fetchProducts();
      })
      .catch((error) => console.error('Error:', error));
  }
}

function editProduct() {
  let productId = document.getElementById('product-id').value;
  let updatedData = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
  };

  fetch(`http://192.168.80.3:5003/api/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (response.status !== 202) {
        throw new Error('Error updating product');
      }
      return response.json();
    })
    .then((updatedProduct) => {
      console.log('Product updated:', updatedProduct);
    })
    .catch((error) => console.error('Error:', error));
}

function fetchProduct(id) {
  fetch(`http://192.168.80.3:5003/api/products/${id}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Error fetching product');
      }
      return response.json();
    })
    .then((product) => {
      console.log('Product fetched:', product);
      document.getElementById('product-id').value = product.id;
      document.getElementById('name').value = product.name;
      document.getElementById('description').value = product.description;
      document.getElementById('price').value = product.price;
    })
    .catch((error) => console.error('Error:', error));
}
