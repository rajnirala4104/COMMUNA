class ApiResponse{
  constructor(status, message="success", data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

module.exports = ApiResponse