const effectStack = [];

const cleanup = (effect, callback) => {
  effect.deps.forEach((dep) => {
    dep.delete(callback);
  });
  effect.deps.clear();
};

export const useEffect = (callback) => {
  const execute = () => {
    effectStack.push(effect);
    cleanup(effect, callback);
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

  const get = () => {
    const effect = effectStack[effectStack.length - 1];
    if (effect) {
      subscribe(subs, effect);
    }
    return initialValue;
  };
  const set = (value) => {
    initialValue = value;

    for (const sub of [...subs]) {
      sub.execute();
    }
  };
  const subscribe = (subs, effect) => {
    subs.add(effect);
    effect.deps.add(subs);
  };

  return [get, set];
};

export const useMemo = (callback) => {
  const [state, setState] = useState();
  useEffect(() => {
    setState(callback());
  });
  return state;
};

// const [name1, setName1] = useState('tome');
// const [name2, setName2] = useState('jerry');
// const [showAll, setShowAll] = useState(false);

// const whoIsHere = useMemo(() => {
//   if (!showAll()) {
//     return name1();
//   }
//   return name1() + name2();
// });

// useEffect(() => {
//   console.log(whoIsHere());
// });

// setName1('tom');
// // console.log(whoIsHere());

// setShowAll(true);
// // console.log(whoIsHere());
