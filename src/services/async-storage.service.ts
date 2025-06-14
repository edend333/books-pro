import { books } from "./booksData"

type Entity = { id: string; [key: string]: any }

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    save: _save,
}

function query<T extends Entity>(entityType: string, delay = 300): Promise<T[]> {
    const entities = JSON.parse(localStorage.getItem(entityType) || '[]') as T[]
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get<T extends Entity>(entityType: string, entityId: string): Promise<T> {
    return query<T>(entityType).then(entities => {
        const entity = entities.find(e => e.id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post<T extends Entity>(entityType: string, newEntity: T): Promise<T> {
    const entityToSave = { ...newEntity, id: _makeId() }
    return query<T>(entityType).then(entities => {
        entities.push(entityToSave)
        _save(entityType, entities)
        return entityToSave
    })
}

function put<T extends Entity>(entityType: string, updatedEntity: T): Promise<T> {
    return query<T>(entityType).then(entities => {
        const idx = entities.findIndex(e => e.id === updatedEntity.id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType: string, entityId: string): Promise<void> {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(e => e.id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// private
function _save<T>(entityType: string, entities: T[]): void {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5): string {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}