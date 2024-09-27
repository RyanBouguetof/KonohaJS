// Create a new ninja
app.post('/ninja', async (req, res) => {
    try {
        const newNinja = new Ninja(req.body);
        await newNinja.save();
        res.status(201).send(newNinja);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all ninjas
app.get('/ninja', async (req, res) => {
    try {
        const ninjas = await Ninja.find();
        res.send(ninjas);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read a single ninja by ID
app.get('/ninja/:id', async (req, res) => {
    try {
        const ninja = await Ninja.findById(req.params.id);
        if (!ninja) return res.status(404).send('Ninja not found');
        res.send(ninja);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a ninja by ID
app.put('/ninja/:id', async (req, res) => {
    try {
        const ninja = await Ninja.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ninja) return res.status(404).send('Ninja not found');
        res.send(ninja);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a ninja by ID
app.delete('/ninja/:id', async (req, res) => {
    try {
        const ninja = await Ninja.findByIdAndDelete(req.params.id);
        if (!ninja) return res.status(404).send('Ninja not found');
        res.send(ninja);
    } catch (error) {
        res.status(500).send(error);
    }
});