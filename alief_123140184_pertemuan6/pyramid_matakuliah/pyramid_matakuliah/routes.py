def includeme(config):  
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    
    # --- ROUTES MATAKULIAH ---
    config.add_route('matakuliah', '/api/matakuliah')
    config.add_route('matakuliah_detail', '/api/matakuliah/{id}')