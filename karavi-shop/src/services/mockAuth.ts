import { load, save, remove } from './storage';

type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // simple plain mock, not secure
};

const USERS_KEY = 'mock_users';
const SESSION_KEY = 'mock_session';

function hash(pw: string) {
  // Simple mock hash (do NOT use in real apps)
  return btoa(pw);
}

export function getUsers(): User[] {
  return load<User[]>(USERS_KEY, []);
}

export function setUsers(users: User[]) {
  save(USERS_KEY, users);
}

export function getCurrentUser(): Omit<User, 'passwordHash'> | null {
  const user = load<Omit<User, 'passwordHash'> | null>(SESSION_KEY, null);
  return user;
}

export function signIn(email: string, password: string) {
  const users = getUsers();
  const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.passwordHash === hash(password));
  if (!u) throw new Error('Invalid email or password.');
  const sessionUser = { id: u.id, name: u.name, email: u.email };
  save(SESSION_KEY, sessionUser);
  return sessionUser;
}

export function signUp(name: string, email: string, password: string) {
  const users = getUsers();
  if (users.some((x) => x.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Email already registered.');
  }
  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: hash(password)
  };
  users.push(newUser);
  setUsers(users);
  const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
  save(SESSION_KEY, sessionUser);
  return sessionUser;
}

export function signOut() {
  remove(SESSION_KEY);
}
