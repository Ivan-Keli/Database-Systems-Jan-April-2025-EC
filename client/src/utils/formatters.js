// Date formatter
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Number formatter for quantities
  export const formatQuantity = (number) => {
    if (number === null || number === undefined) return '';
    return number.toLocaleString();
  };
  
  // Status formatter
  export const formatStatus = (status) => {
    if (!status) return '';
    
    const statusMap = {
      'pending': 'Pending',
      'in_transit': 'In Transit',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    
    return statusMap[status.toLowerCase()] || status;
  };
  
  // Truncate text
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };
