const effectStack = [];

function cleanupEffect(effect) {
  if (effect.deps) {
    for (const subs of effect.deps) {
      subs.delete(effect);
    }
    effect.deps.clear();
  }
}

function subscribe(effect, subs) {
  subs.add(effect);
  effect.deps.add(subs);
}

export const useEffect = (callback) => {
  const execute = () => {
    cleanupEffect(effect);
    effectStack.push(effect);
    try {
      callback();
    } finally {
      effectStack.pop();
    }
  };

  const effect = {
    execute,
    deps: new Set(),
  };

  execute();
};

export const useState = (initialValue) => {
  const subs = new Set();
  let value = initialValue;
  const getValue = () => {
    const effect = effectStack[effectStack.length - 1];
    if (effect) {
      subscribe(effect, subs);
    }
    return value;
  };
  const setValue = (newValue) => {
    value = newValue;

    for (const effect of [...subs]) {
      effect.execute();
    }
  };
  return [getValue, setValue];
};

export const useMemo = (callback) => {
  const [value, setValue] = useState();
  useEffect(() => {
    setValue(callback());
  });
  return value;
};

const [name1, setName1] = useState("name1");
const [name2, setName2] = useState("name2");
const [showAll, setShowAll] = useState(true);
  const whoIsHere = useMemo(() => {
    if (!showAll()) {
      return name1();
    } else {
      return `${name1()} and ${name2()}`;
    }
  });

useEffect(() => {
  console.log("whoIsHere", whoIsHere());
});

setName1("lily");
setShowAll(false);
console.log("setShowAllfalse",);
setName2("lucy");
setName1('tome===')
