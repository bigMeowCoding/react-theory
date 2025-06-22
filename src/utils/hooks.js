const effectStack = [];

function clearDependencies(effect) {
  effect.dependencies.forEach((subs) => {
    subs.delete(effect);
  });
  effect.dependencies.clear();
}

export function useEffect(callback) {
  const execute = () => {
    clearDependencies(effect);
    effectStack.push(effect);
    try {
      callback();
    } finally {
      effectStack.pop();
    }
  };
  const effect = {
    dependencies: new Set(),
    execute,
  };

  effect.execute();
}

function subscribe(effect, subs) {
  subs.add(effect);
  effect.dependencies.add(subs);
}

export function useState(initialValue) {
  const subs = new Set();
  function getValue() {
    const effect = effectStack[effectStack.length - 1];
    effect && subscribe(effect, subs);
    return initialValue;
  }
  function setValue(value) {
    initialValue = value;
    for (const sub of [...subs]) {
      sub.execute();
    }
  }
  return [getValue, setValue];
}

export function useMemo(callback) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    setValue(callback());
  });
  return value;
}
