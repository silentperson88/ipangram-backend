module.exports = {
  /* common */
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
  USER_NOT_REGISTERED: 'User not registered',
  INVALID_PASSWORD:
    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  LOGIN_SUCCESS: 'Login successfully',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  PASSWORD_NOT_MATCHED: 'Password not matched',
  USER_REGISTER_SUCCESS: 'User registered successfully',
  USER_REGISTER_FAILED: 'User registered failed',
  USER_NOT_FOUND: 'User not found',
  USER_UPDATED: 'User updated successfully',

  /**user */
  USER_NOT_MANAGER: 'User is not manager',
  USER_RETRIVED: 'User retrived successfully',

  /**Department */
  DEPARTMENT_ALREADY_EXISTS: 'Department already exists',
  DEPARTMENT_CREATED: 'Department created successfully',
  DEPARTMENT_CREATED_FAILED: 'Department created failed',
  DEPARTMENT_FETCHED: 'Department fetched successfully',
  DEPARTMENT_FETCHED_FAILED: 'Department fetched failed',
  DEPARTMENT_MEMBER_ADDED_FAILED: 'Department member added failed',
  DEPARTMENT_MEMBER_ADDED: 'Department member added successfully',
  MEMBER_ALREADY_IN_DEPARTMENT: 'Member already in department',
  DEPARTMENT_NOT_FOUND: 'Department not found',
  DEPARTMENT_MEMBER_REMOVED: 'Department member removed successfully',
  DEPARTMENT_MEMBER_REMOVED_FAILED: 'Department member removed failed',
  MEMBER_NOT_FOUND: 'Member not found',
  MEMBER_LIST_REQUIRED: 'Member list required',
  NO_NEW_MEMBERS_ADDED: 'No new members added',
  MEMBER_NOT_IN_DEPARTMENT: 'Member not in department',
};
