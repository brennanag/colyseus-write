Perfect! I have all the information I need. Here's the comprehensive implementation plan:

## 🎯 Implementation Plan: Tiptap Editor with Auto-save

### **Phase 1: Backend Setup**

1. **Add Auto-save Configuration**
   - Add `AUTO_SAVE_INTERVAL_MS: 15000` to `game-config.ts`
2. **Create Auto-save Endpoint**

   - New endpoint: `POST /api/submissions/auto-save`
   - Accepts: `{ roundId: string, playerId: string, content: string }`
   - Stores partial submissions in a new table or extends existing Submission model

3. **Update Submission Logic**
   - "Submit" button triggers auto-save + marks player as ready
   - Add buffer period at round end for final auto-saves

### **Phase 2: Frontend Integration**

1. **Replace Textarea with Tiptap**

   - Use Tiptap SimpleEditor component
   - Pre-populate with accumulated story content
   - Auto-position cursor at end of content

2. **Implement Auto-save System**

   - 15-second interval (configurable)
   - Sends entire document HTML
   - Error handling: log failures, continue with next attempt

3. **Player Identification in Content**

   - Wrap each contribution in: `<div data-player-id="player123">content</div>`
   - Parse existing content to maintain player attribution

4. **Enhanced Submission Flow**
   - "Submit" triggers immediate auto-save + ready status
   - Visual feedback for auto-save status (saving/saved)

### **Phase 3: Game Flow Updates**

1. **Writing Phase Enhancements**

   - Load accumulated story at start
   - Auto-save protects against disconnections
   - Early completion when all players submit

2. **Buffer Period Implementation**
   - Allow time for final auto-saves after round end
   - Ensure no data loss during phase transitions

### **Technical Considerations**

- **Content Storage**: Raw HTML with player ID attributes
- **Cursor Management**: Tiptap API to set cursor position
- **Error Resilience**: Auto-save continues despite failures
- **Performance**: Full document sends (optimize later with diffs)

### **Files to Modify/Create**

1. `server/src/constants/game-config.ts` - Add auto-save interval
2. `server/src/routes/submissions.ts` - New auto-save endpoint
3. `client/components/WritingPhase.tsx` - Tiptap integration
4. `client/hooks/useAutoSave.ts` - Auto-save logic (new)
5. Update game state management for early completion

### **Next Steps**

1. Start with backend changes (config + endpoint)
2. Then frontend Tiptap integration
3. Finally, auto-save system and game flow updates

**Ready to begin coding?** I suggest we start with Phase 1 (backend setup) and work through each phase systematically. Which phase would you like to start with?
