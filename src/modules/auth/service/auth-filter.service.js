class AuthFilterService {
  toSafeUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
}

module.exports = new AuthFilterService();
