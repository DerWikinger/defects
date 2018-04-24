var con = new ActiveXObject("ADODB.Connection", {
    activate: false, // Allow activate existance object instance, false by default
    async: true, // Allow asynchronius calls, true by default (for future usage)
    type: true	// Allow using type information, true by default
});

console.dir(con);