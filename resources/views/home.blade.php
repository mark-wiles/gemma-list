@extends('layouts.app')

@section('content')

<div class="row pt-4">

    <aside class="col-md-3 side-bar">

        @include('errors')

        <form action="/glists" class="font-small" method="POST">

            @csrf
            
            <h2 class="mb-1 text-success">Create List</h2>

            <input name="name" type="text" value="{{ old('name') }}" placeholder="add a new list" required>
            
            <button class="button" type="submit">+</button>

        </form>

        <form method="POST" action="/tasks">

            @method('DELETE')
    
            @csrf
            
            <button class="btn-danger font-small mt-3" type="submit">Delete Completed</button>

        </form>

        <div class="archived-container mt-5">
        
            <h4 class="archived-header">Archived Glists</h4>

            @foreach ($glists as $glist)

                @if ($glist->archived)

                    <form class="un-archive" method="POST" action="/glists/{{ $glist->id }}/archive">
                                
                        @csrf
                        @method('PATCH')

                        <button class="dropdown-item" type="submit">{{ $glist->name }}</button>
                            
                    </form>

                @endif

            @endforeach
        
        </div>

    </aside>

    <div class="col-md-9 lists-container">
    
        @foreach ($glists as $glist)

            @if (!$glist->archived)

                <div class="list-container">
                
                    <div class="list-header">
                        
                        <div class="glist-header" id="glist-header-{{ $glist->id }}">

                            <h2 class="list-name mb-1">{{ $glist->name }}</h2>

                            <span class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>

                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                <button class="dropdown-item edit-glist-btn" data-id="{{ $glist->id }}">Edit List</button>

                                <form class="hidden-glist" method="POST" action="/glists/{{ $glist->id }}/archive">
                                
                                    @csrf
                                    @method('PATCH')

                                    <button class="dropdown-item" type="submit">Hide List</button>
                            
                                </form>

                                <form method="POST" action="/glists/{{ $glist->id }}/delete">

                                    @method('DELETE')

                                    @csrf

                                    <button class="dropdown-item" type="submit">Delete List</button>

                                </form>

                            </div>

                            <div class="dropdown"></div>
                        
                        </div>

                        <div class="edit-glist mb-2 mt-2 hidden" id="edit-glist-{{ $glist->id }}">

                            <form class="edit-glist-form font-small" method="POST" action="/glists/{{ $glist->id }}">
                            
                                @csrf
                                @method('PATCH')

                                <input name="name" type="text" value="{{ $glist->name }}">

                                <button type="submit">update</button>

                                <button id="close-edit-{{ $glist->id }}">x</button>
                                
                            </form>

                        </div>
                        
                    </div>

                    <div class="add-task-container mb-2">

                        <form class="add-task-form font-small" method="POST" action="/glists/{{ $glist->id }}/task">

                            @csrf

                            <input class="add-task-input" type="text" name="title" placeholder="Add Task" required>

                            <button class="button" type="submit">+</button>

                        </form>

                    </div>

                    <div class="task-container">
                        
                        @foreach ($glist->tasks as $task)

                            <form action="/tasks/{{ $task->id }}" method="POST">

                                @method('PATCH')
                                @csrf

                                <label for="completed" class="checkbox {{ $task->completed ? 'is-completed' : '' }}">

                                <input type="checkbox" name="completed" onChange="this.form.submit()" {{ $task->completed ? 'checked' : '' }}>

                                {{ $task->title }}

                                </label>

                            </form>

                        @endforeach
                
                    </div>
            
                </div>

            @endif

        @endforeach

    </div>

</div>

@endsection
